<?php

namespace App\Http\Controllers\Api;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resume;

class ResumeController extends Controller
{
    // CREATE RESUME
    public function createResume(Request $request)
    {
        $request->validate([

            'user_id' => 'required',

            'title' => 'required',

            'full_name' => 'required',

            'email' => 'required|email',

            'phone' => 'required',

            'skills' => 'required',

            'education' => 'required',

            'experience' => 'required',

            'industry' => 'required',

            'template' => 'required'

        ]);

        $resume = Resume::create([

            'user_id' => $request->user_id,

            'title' => $request->title,

            'full_name' => $request->full_name,

            'email' => $request->email,

            'phone' => $request->phone,

            'skills' => $request->skills,

            'education' => $request->education,

            'experience' => $request->experience,

            'industry' => $request->industry,

            'template' => $request->template,

            'is_public' => $request->is_public ?? false,

            'share_link' => uniqid('resume_')

        ]);

        return response()->json([

            'message' => 'Resume Created Successfully',

            'resume' => $resume

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

        if (!$resume) {

            return response()->json([

                'message' => 'Resume Not Found'

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

        if (!$resume) {

            return response()->json([

                'message' => 'Resume Not Found'

            ], 404);
        }

        $resume->update($request->all());

        return response()->json([

            'message' => 'Resume Updated Successfully',

            'resume' => $resume

        ]);
    }

    // DELETE RESUME
    public function deleteResume($id)
    {
        $resume = Resume::find($id);

        if (!$resume) {

            return response()->json([

                'message' => 'Resume Not Found'

            ], 404);
        }

        $resume->delete();

        return response()->json([

            'message' => 'Resume Deleted Successfully'

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

        if (!$resume) {

            return response()->json([

                'message' => 'Resume Not Found'

            ], 404);
        }

        return response()->json($resume);
    }
    public function downloadResume($id)
{
    $resume = Resume::find($id);

    if (!$resume) {

        return response()->json([

            'message' => 'Resume Not Found'

        ], 404);
    }

    $pdf = Pdf::loadView(

        'resume.template',

        compact('resume')

    );

    return $pdf->download('resume.pdf');
}

}