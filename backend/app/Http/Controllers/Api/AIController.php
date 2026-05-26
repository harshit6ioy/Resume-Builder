<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    // AI RESUME SUMMARY
    public function generateSummary(Request $request)
    {
        $request->validate([

            'skills' => 'required',

            'industry' => 'required',

            'experience' => 'required'

        ]);

        $prompt = "
        Generate a professional resume summary based on the following details.
        CRITICAL: DO NOT include any conversational text like 'Here is your summary' or 'Would you like me to adjust anything'. 
        Output ONLY the summary paragraph directly.

        Skills: {$request->skills}

        Industry: {$request->industry}

        Experience: {$request->experience}
        ";



        $response = Http::timeout(120)

            ->withHeaders([

                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),

                'HTTP-Referer' => env('APP_URL', 'http://localhost'),

                'X-Title' => 'Resume Builder'

            ])->post(

                'https://openrouter.ai/api/v1/chat/completions',

                [

                    'model' => env('OPENROUTER_MODEL'),

                    'messages' => [

                        [

                            'role' => 'system',

                            'content' => '

                            You are an AI Resume Assistant.

                            Only answer resume-related and career-related questions.

                            Help with:
                            - resume summaries
                            - skills
                            - projects
                            - ATS optimization
                            - interview preparation
                            - professional experience descriptions
                            - career guidance

                            If the question is unrelated to resumes,
                            jobs, interviews, or careers,
                            politely refuse to answer.

                            '

                        ],

                        [

                            'role' => 'user',

                            'content' => $prompt

                        ]

                    ]

                ]

            );

        $data = $response->json();

        if (!$response->successful() || isset($data['error'])) {
            return response()->json(['error' => $data['error']['message'] ?? 'AI API Error'], 500);
        }

        return response()->json([
            'content' => $data['choices'][0]['message']['content'] ?? 'No content generated.'
        ]);
    }

    // AI SKILL SUGGESTIONS
    public function suggestSkills(Request $request)
    {
        $request->validate([

            'industry' => 'required'

        ]);

        $prompt = "
        Suggest important resume skills for {$request->industry} industry.
        CRITICAL: DO NOT include any conversational text.
        Output ONLY a comma-separated list of skill names.

        ";

        $response = Http::timeout(120)

            ->withHeaders([

                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),

                'HTTP-Referer' => env('APP_URL', 'http://localhost'),

                'X-Title' => 'Resume Builder'

            ])->post(

                'https://openrouter.ai/api/v1/chat/completions',

                [

                    'model' => env('OPENROUTER_MODEL'),

                    'messages' => [

                        [

                            'role' => 'system',

                            'content' => '

                            You are an AI Resume Assistant.

                            Only answer career and resume related queries.

                            '

                        ],

                        [

                            'role' => 'user',

                            'content' => $prompt

                        ]

                    ]

                ]

            );

        $data = $response->json();

        if (!$response->successful() || isset($data['error'])) {
            return response()->json(['error' => $data['error']['message'] ?? 'AI API Error'], 500);
        }

        return response()->json([
            'content' => $data['choices'][0]['message']['content'] ?? 'No content generated.'
        ]);
    }

    // AI PROJECT SUGGESTIONS
    public function suggestProjects(Request $request)
    {
        $request->validate([

            'skills' => 'required'

        ]);

        $prompt = "
        Suggest resume-worthy software development projects based on these skills:

        {$request->skills}

        CRITICAL: DO NOT include any conversational text.
        Give ONLY the project names with short descriptions in a clean list format.

        ";

        $response = Http::timeout(120)

            ->withHeaders([

                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),

                'HTTP-Referer' => env('APP_URL', 'http://localhost'),

                'X-Title' => 'Resume Builder'

            ])->post(

                'https://openrouter.ai/api/v1/chat/completions',

                [

                    'model' => env('OPENROUTER_MODEL'),

                    'messages' => [

                        [

                            'role' => 'system',

                            'content' => '

                            You are an AI Resume Assistant.

                            Only answer career and resume related queries.

                            '

                        ],

                        [

                            'role' => 'user',

                            'content' => $prompt

                        ]

                    ]

                ]

            );

        $data = $response->json();

        if (!$response->successful() || isset($data['error'])) {
            return response()->json(['error' => $data['error']['message'] ?? 'AI API Error'], 500);
        }

        return response()->json([
            'content' => $data['choices'][0]['message']['content'] ?? 'No content generated.'
        ]);
    }
    // AI ATS REVIEW
    public function reviewResume(Request $request)
    {
        $request->validate([

            'resume_text' => 'required'

        ]);

        $prompt = "
    Analyze this resume for ATS optimization.
    CRITICAL: DO NOT include any conversational text.
    
    Give:
    - ATS score out of 100
    - missing skills
    - grammar improvements
    - formatting suggestions
    - professional improvements

    Resume:

    {$request->resume_text}
    ";



        $response = Http::timeout(120)

            ->withHeaders([

                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),

                'HTTP-Referer' => env('APP_URL', 'http://localhost'),

                'X-Title' => 'Resume Builder'

            ])->post(

                'https://openrouter.ai/api/v1/chat/completions',

                [

                    'model' => env('OPENROUTER_MODEL'),

                    'messages' => [

                        [

                            'role' => 'system',

                            'content' => '

                        You are an AI Resume ATS Reviewer.

                        Only review resumes and career-related content.

                        '

                        ],

                        [

                            'role' => 'user',

                            'content' => $prompt

                        ]

                    ]

                ]

            );

        $data = $response->json();

        if (!$response->successful() || isset($data['error'])) {
            return response()->json(['error' => $data['error']['message'] ?? 'AI API Error'], 500);
        }

        return response()->json([
            'content' => $data['choices'][0]['message']['content'] ?? 'No content generated.'
        ]);
    }
}