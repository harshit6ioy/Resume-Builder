<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ResumeController extends Controller
{
    // CREATE RESUME
    public function createResume(Request $request)
    {
        $request->validate([

            'title' => 'required',

            'full_name' => 'required',

            'email' => 'nullable|email',

            'phone' => 'nullable|string',

            'skills' => 'nullable',

            'education' => 'nullable|string',

            'experience' => 'nullable|string',

            'projects' => 'nullable|string',

            'activity_type' => 'nullable|in:achievements,co_curricular',

            'activity_details' => 'nullable|string',

            'summary' => 'nullable|string',

            'industry' => 'nullable|string',

            'template' => 'required',
            'font_size' => 'nullable|in:default,small,medium,large',
            'font_style' => 'nullable|in:default,sans,serif,mono',
            'font_weight' => 'nullable|in:default,light,regular,medium,bold',

        ]);

        $user = $request->user();
        $ownerId = $user ? (string) $user->id : $request->user_id;

        if (! $ownerId) {
            return response()->json([
                'message' => 'Please sign in again before saving your resume.',
            ], 401);
        }

        $resume = Resume::create([

            'user_id' => $ownerId,

            'title' => $request->title,

            'full_name' => $request->full_name,

            'email' => $request->email ?: ($user->email ?? ''),

            'phone' => $request->phone ?? '',

            'skills' => $request->skills ?? '',

            'education' => $request->education ?? '',

            'experience' => $request->experience ?? '',

            'projects' => $request->projects ?? '',

            'activity_type' => $request->activity_type ?? 'achievements',

            'activity_details' => $request->activity_details ?? '',

            'summary' => $request->summary,

            'industry' => $request->industry ?? '',

            'template' => $request->template,
            'font_size' => $request->font_size ?? 'default',
            'font_style' => $request->font_style ?? 'default',
            'font_weight' => $request->font_weight ?? 'default',

            'is_public' => $request->is_public ?? false,

            'share_link' => uniqid('resume_'),

        ]);

        return response()->json([

            'message' => 'Resume Created Successfully',

            'resume' => $resume,

        ], 201);
    }

    // GET ALL RESUMES
    public function getResumes()
    {
        $resumes = Resume::all();

        return response()->json($resumes);
    }

    // GET SINGLE RESUME
    public function getResume($id)
    {
        $resume = Resume::find($id);

        if (! $resume) {

            return response()->json([

                'message' => 'Resume Not Found',

            ], 404);
        }

        return response()->json($resume);
    }

    // GET USER RESUMES
    public function getUserResumes($userId)
    {
        $resumes = Resume::where('user_id', $userId)->get();

        return response()->json($resumes);
    }

    // UPDATE RESUME
    public function updateResume(Request $request, $id)
    {
        $resume = Resume::find($id);

        if (! $resume) {

            return response()->json([

                'message' => 'Resume Not Found',

            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required',
            'full_name' => 'sometimes|required',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'skills' => 'nullable',
            'education' => 'nullable|string',
            'experience' => 'nullable|string',
            'projects' => 'nullable|string',
            'activity_type' => 'nullable|in:achievements,co_curricular',
            'activity_details' => 'nullable|string',
            'summary' => 'nullable|string',
            'industry' => 'nullable|string',
            'template' => 'sometimes|required',
            'font_size' => 'nullable|in:default,small,medium,large',
            'font_style' => 'nullable|in:default,sans,serif,mono',
            'font_weight' => 'nullable|in:default,light,regular,medium,bold',
            'is_public' => 'nullable|boolean',
        ]);

        $resume->update($validated);

        return response()->json([

            'message' => 'Resume Updated Successfully',

            'resume' => $resume,

        ]);
    }

    // DELETE RESUME
    public function deleteResume($id)
    {
        $resume = Resume::find($id);

        if (! $resume) {

            return response()->json([

                'message' => 'Resume Not Found',

            ], 404);
        }

        $resume->delete();

        return response()->json([

            'message' => 'Resume Deleted Successfully',

        ]);
    }

    // PUBLIC RESUME
    public function publicResume($shareLink)
    {
        $resume = Resume::where(

            'share_link',
            $shareLink

        )->where(

            'is_public',
            true

        )->first();

        if (! $resume) {

            return response()->json([

                'message' => 'Resume Not Found',

            ], 404);
        }

        return response()->json($resume);
    }

    public function downloadResume($id)
    {
        $resume = Resume::find($id);

        if (! $resume) {

            return response()->json([

                'message' => 'Resume Not Found',

            ], 404);
        }

        $pdf = Pdf::loadView(

            'resume.template',

            compact('resume')

        );

        return $pdf->download('resume.pdf');
    }

    public function emailResume(Request $request, $id)
    {
        $resume = Resume::find($id);

        if (! $resume) {
            return response()->json([
                'message' => 'Resume Not Found',
            ], 404);
        }

        $owner = User::find($resume->user_id);

        if (! $owner) {
            return response()->json([
                'message' => 'Resume owner account was not found.',
            ], 404);
        }

        $pdf = Pdf::loadView(
            'resume.template',
            compact('resume')
        );

        $fileName = preg_replace('/[^A-Za-z0-9_-]+/', '_', $resume->title ?: 'resume').'.pdf';
        $recipient = $owner->email;

        Mail::send('emails.resume', [
            'user' => $owner,
            'resume' => $resume,
        ], function ($message) use ($recipient, $pdf, $fileName, $resume) {
            $message->to($recipient)
                ->subject('Your resume: '.($resume->title ?: 'Resume'))
                ->attachData($pdf->output(), $fileName, [
                    'mime' => 'application/pdf',
                ]);
        });

        return response()->json([
            'message' => 'Resume sent to your login email.',
            'email' => $recipient,
        ]);
    }
}
