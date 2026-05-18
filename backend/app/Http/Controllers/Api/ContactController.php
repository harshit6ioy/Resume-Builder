<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactRequest;

class ContactController extends Controller
{
    // SEND CONTACT REQUEST
    public function sendRequest(Request $request)
    {
        $request->validate([

            'recruiter_name' => 'required',

            'candidate_email' => 'required|email',

            'message' => 'required'

        ]);

        $contact = ContactRequest::create([

            'recruiter_name' => $request->recruiter_name,

            'candidate_email' => $request->candidate_email,

            'message' => $request->message

        ]);

        return response()->json([

            'message' => 'Contact Request Sent',

            'data' => $contact

        ]);
    }

    // GET CONTACT REQUESTS
    public function getRequests(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $requests = ContactRequest::where('candidate_email', $request->email)->orderBy('created_at', 'desc')->get();

        return response()->json($requests);
    }
}