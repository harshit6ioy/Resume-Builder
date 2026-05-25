<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    private const OTP_TTL_MINUTES = 10;

    private function passwordRules(): array
    {
        return [
            'required',
            'string',
            Password::min(8)->letters()->numbers()->symbols(),
        ];
    }

    private function makeOtp(): string
    {
        return (string) random_int(100000, 999999);
    }

    private function sendOtpMail(string $email, string $otp, string $purpose): void
    {
        Mail::send('emails.otp', [
            'otp' => $otp,
            'purpose' => $purpose,
            'expiresIn' => self::OTP_TTL_MINUTES,
        ], function ($message) use ($email, $purpose) {
            $message->to($email)
                ->subject($purpose.' OTP');
        });
    }

    private function storeEmailVerificationOtp(User $user): void
    {
        $otp = $this->makeOtp();

        $user->email_verification_otp = Hash::make($otp);
        $user->email_verification_expires_at = now()->addMinutes(self::OTP_TTL_MINUTES);
        $user->save();

        $this->sendOtpMail($user->email, $otp, 'Email verification');
    }

    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => $this->passwordRules(),
        ], [
            'password.min' => 'Password must be at least 8 characters.',
            'password.letters' => 'Password must include at least one letter.',
            'password.numbers' => 'Password must include at least one number.',
            'password.symbols' => 'Password must include at least one special character, like @, #, $, or !.',
        ]);

        $email = strtolower($request->email);

        if (User::where('email', $email)->exists()) {
            return response()->json([
                'message' => 'This email is already registered.',
                'errors' => [
                    'email' => ['This email is already registered.'],
                ],
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'is_verified' => false,
        ]);

        $this->storeEmailVerificationOtp($user);

        return response()->json([
            'message' => 'Registration successful. Please verify your email with the OTP we sent.',
            'email' => $user->email,
            'requires_verification' => true,
        ], 201);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->is_verified) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Email is already verified',
                'user' => $user,
                'token' => $token,
            ]);
        }

        $expiresAt = $user->email_verification_expires_at;

        if (
            ! $user->email_verification_otp ||
            ! $expiresAt ||
            now()->greaterThan($expiresAt) ||
            ! Hash::check($request->otp, $user->email_verification_otp)
        ) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        $user->is_verified = true;
        $user->email_verification_otp = null;
        $user->email_verification_expires_at = null;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified successfully',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function resendVerificationOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->is_verified) {
            return response()->json(['message' => 'Email is already verified']);
        }

        $this->storeEmailVerificationOtp($user);

        return response()->json([
            'message' => 'A new verification OTP has been sent to your email.',
        ]);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Credentials',
            ], 401);
        }

        if (! $user->is_verified) {
            $this->storeEmailVerificationOtp($user);

            return response()->json([
                'message' => 'Please verify your email. A fresh OTP has been sent.',
                'email' => $user->email,
                'requires_verification' => true,
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if ($user) {
            $otp = $this->makeOtp();
            $user->password_reset_otp = Hash::make($otp);
            $user->password_reset_expires_at = now()->addMinutes(self::OTP_TTL_MINUTES);
            $user->save();

            $this->sendOtpMail($user->email, $otp, 'Password reset');
        }

        return response()->json([
            'message' => 'If that email exists, a password reset OTP has been sent.',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
            'password' => $this->passwordRules(),
        ], [
            'password.min' => 'Password must be at least 8 characters.',
            'password.letters' => 'Password must include at least one letter.',
            'password.numbers' => 'Password must include at least one number.',
            'password.symbols' => 'Password must include at least one special character, like @, #, $, or !.',
        ]);

        $user = User::where('email', strtolower($request->email))->first();

        if (! $user) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        $expiresAt = $user->password_reset_expires_at;

        if (
            ! $user->password_reset_otp ||
            ! $expiresAt ||
            now()->greaterThan($expiresAt) ||
            ! Hash::check($request->otp, $user->password_reset_otp)
        ) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        $user->password = Hash::make($request->password);
        $user->password_reset_otp = null;
        $user->password_reset_expires_at = null;
        $user->is_verified = true;
        $user->tokens()->delete();
        $user->save();

        return response()->json([
            'message' => 'Password reset successfully. Please sign in with your new password.',
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged Out Successfully',
        ]);
    }
}
