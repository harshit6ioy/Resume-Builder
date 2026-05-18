<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    // VERIFY USER
    public function verifyUser($id)
    {
        $user = User::find($id);

        if (!$user) {

            return response()->json([

                'message' => 'User Not Found'

            ], 404);
        }

        $user->update([

            'is_verified' => true

        ]);

        return response()->json([

            'message' => 'User Verified Successfully',

            'user' => $user

        ]);
    }

    // GET PENDING RECRUITERS / COACHES
    public function pendingUsers()
    {
        $users = User::where(

            'is_verified',
            false

        )->whereIn('role', [

            'recruiter',
            'coach'

        ])->get();

        return response()->json($users);
    }
}