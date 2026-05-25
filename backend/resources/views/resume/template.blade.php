<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Resume - {{ $resume->full_name }}</title>
    <style>
        body { margin: 0; padding: 0; color: #333; line-height: 1.5; }
        .page-break { page-break-after: always; }
        table { width: 100%; border-collapse: collapse; }
        td { vertical-align: top; }
        .avoid-break { page-break-inside: avoid; }
        
        /* Utility Classes */
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .uppercase { text-transform: uppercase; }
        .bold { font-weight: bold; }
        .mb-2 { margin-bottom: 10px; }
        .mb-4 { margin-bottom: 20px; }
        .mt-4 { margin-top: 20px; }
        .pb-2 { padding-bottom: 10px; }
        
        /* Typography */
        .sans { font-family: 'Helvetica', 'Arial', sans-serif; }
        .serif { font-family: 'Georgia', 'Times New Roman', serif; }
        
    </style>
</head>
<body>
@php
    $templateStr = strtolower($resume->template ?? 'modern');
    $skillsList = is_array($resume->skills) ? $resume->skills : array_map('trim', explode(',', $resume->skills));
    $skillsList = array_filter($skillsList);
    $projects = trim((string) data_get($resume, 'projects', ''));
    $activityType = data_get($resume, 'activity_type', 'achievements');
    $activityDetails = trim((string) data_get($resume, 'activity_details', ''));
    $activityLabel = $activityType === 'co_curricular' ? 'Co-curricular Activities' : 'Achievements';
@endphp

@if(str_contains($templateStr, 'minimal') || $templateStr === 'modern' || $templateStr === 'modern minimal')
    <!-- ==================== MINIMAL TEMPLATE ==================== -->
    <div class="serif" style="padding: 40px;">
        <div style="border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 32px; font-weight: normal; margin: 0 0 5px 0; color: #111;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: #666; font-size: 14px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;&bull;&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        <table>
            <tr>
                <td style="width: 30%; padding-right: 30px;">
                    @if(count($skillsList) > 0)
                    <div class="avoid-break mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Skills</h3>
                        @foreach($skillsList as $skill)
                            <div style="font-size: 13px; color: #444; margin-bottom: 5px;">{{ $skill }}</div>
                        @endforeach
                    </div>
                    @endif

                    @if($resume->education)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Education</h3>
                        <div style="font-size: 13px; color: #444; white-space: pre-wrap;">{{ $resume->education }}</div>
                    </div>
                    @endif

                    @if($activityDetails)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">{{ $activityLabel }}</h3>
                        <div style="font-size: 13px; color: #444; white-space: pre-wrap;">{{ $activityDetails }}</div>
                    </div>
                    @endif
                </td>
                <td style="width: 70%; padding-left: 30px; border-left: 1px solid #eee;">
                    @if($resume->summary)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Professional Summary</h3>
                        <div style="font-size: 13px; color: #333; line-height: 1.6;">{{ $resume->summary }}</div>
                    </div>
                    @endif

                    @if($resume->experience)
                    <div>
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Experience</h3>
                        <div style="font-size: 13px; color: #333; white-space: pre-wrap; line-height: 1.6;">{{ $resume->experience }}</div>
                    </div>
                    @endif

                    @if($projects)
                    <div class="mt-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Projects</h3>
                        <div style="font-size: 13px; color: #333; white-space: pre-wrap; line-height: 1.6;">{{ $projects }}</div>
                    </div>
                    @endif
                </td>
            </tr>
        </table>
    </div>

@elseif(str_contains($templateStr, 'corporate') || str_contains($templateStr, 'standard'))
    <!-- ==================== CORPORATE TEMPLATE ==================== -->
    <div class="sans" style="padding: 40px;">
        <div class="text-center" style="margin-bottom: 30px;">
            <h1 class="uppercase bold" style="font-size: 36px; margin: 0 0 10px 0; color: #0f172a; letter-spacing: 2px;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: #475569; font-size: 14px; font-weight: bold;">
                {{ $resume->title ?: 'Professional' }}
            </div>
            <div style="color: #64748b; font-size: 13px; margin-top: 5px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;|&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        @if($resume->summary)
        <div class="mb-4">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Summary</h3>
            <div style="font-size: 14px; color: #334155; line-height: 1.6;">{{ $resume->summary }}</div>
        </div>
        @endif

        @if(count($skillsList) > 0)
        <div class="mb-4 avoid-break">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Core Competencies</h3>
            <table style="width: 100%;">
                <tr>
                    @php $i = 0; @endphp
                    @foreach($skillsList as $skill)
                        <td style="width: 33%; padding: 4px 0; font-size: 13px; color: #475569;">
                            &bull; {{ $skill }}
                        </td>
                        @php $i++; @endphp
                        @if($i % 3 == 0) </tr><tr> @endif
                    @endforeach
                </tr>
            </table>
        </div>
        @endif

        @if($resume->experience)
        <div class="mb-4">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Professional Experience</h3>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $resume->experience }}</div>
        </div>
        @endif

        @if($projects)
        <div class="mb-4">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Projects</h3>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $projects }}</div>
        </div>
        @endif

        @if($resume->education)
        <div class="mb-4 avoid-break">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Education</h3>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $resume->education }}</div>
        </div>
        @endif

        @if($activityDetails)
        <div class="mb-4 avoid-break">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">{{ $activityLabel }}</h3>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $activityDetails }}</div>
        </div>
        @endif
    </div>

@elseif(str_contains($templateStr, 'executive'))
    <!-- ==================== EXECUTIVE TEMPLATE ==================== -->
    <div class="serif" style="background-color: #ffffff; color: #0f172a;">
        <div class="text-center" style="padding: 40px 40px 24px 40px; border-bottom: 4px solid #0f172a;">
            <h1 class="bold" style="font-size: 44px; margin: 0 0 12px 0; color: #0f172a;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div class="sans" style="color: #475569; font-size: 13px; letter-spacing: .5px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;&bull;&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        <div style="padding: 40px;">
            @if($resume->summary)
            <div class="text-center" style="margin: 0 auto 32px auto; max-width: 650px;">
                <div style="font-size: 14px; color: #334155; line-height: 1.7; font-style: italic;">&quot;{{ $resume->summary }}&quot;</div>
            </div>
            @endif

            <table>
                <tr>
                    <td style="width: 50%; padding-right: 30px;">
                        @if($resume->experience)
                        <div>
                            <h3 class="uppercase bold" style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 2px;">Experience</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $resume->experience }}</div>
                        </div>
                        @endif

                        @if($projects)
                        <div class="mt-4">
                            <h3 class="uppercase bold" style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 2px;">Projects</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $projects }}</div>
                        </div>
                        @endif
                    </td>
                    <td style="width: 50%; padding-left: 30px; border-left: 1px solid #e2e8f0;">
                        @if($resume->education)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 2px;">Education</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $resume->education }}</div>
                        </div>
                        @endif

                        @if(count($skillsList) > 0)
                        <div class="avoid-break">
                            <h3 class="uppercase bold" style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 2px;">Expertise</h3>
                            @foreach($skillsList as $skill)
                                <span style="font-size: 12px; color: #1e293b; background-color: #f1f5f9; border: 1px solid #e2e8f0; padding: 5px 10px; margin: 0 6px 8px 0; display: inline-block;">{{ $skill }}</span>
                            @endforeach
                        </div>
                        @endif

                        @if($activityDetails)
                        <div class="avoid-break mt-4">
                            <h3 class="uppercase bold" style="font-size: 18px; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-bottom: 16px; letter-spacing: 2px;">{{ $activityLabel }}</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $activityDetails }}</div>
                        </div>
                        @endif
                    </td>
                </tr>
            </table>
        </div>
    </div>

@elseif(str_contains($templateStr, 'creative'))
    <!-- ==================== CREATIVE TEMPLATE ==================== -->
    <div class="sans" style="background-color: #fff7ed; color: #0f172a; padding: 28px 34px;">
        <div style="padding-bottom: 22px;">
            <h1 class="bold" style="font-size: 42px; line-height: 1.05; margin: 0 0 12px 0; color: #ea580c; letter-spacing: -1px;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: rgba(124, 45, 18, .65); font-size: 13px; font-weight: bold;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;&nbsp;&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        @if($resume->summary)
        <div style="border-left: 4px solid #fb923c; padding: 8px 0 8px 20px; margin-bottom: 28px;">
            <div style="font-size: 13px; color: #334155; line-height: 1.65; font-weight: bold;">{{ $resume->summary }}</div>
        </div>
        @endif

        <div>
            <table>
                <tr>
                    <td style="width: 67%; padding-right: 34px;">
                        @if($resume->experience)
                        <div class="mb-4">
                            <h3 class="bold" style="font-size: 24px; color: #7c2d12; margin: 0 0 14px 0; text-decoration: underline; text-decoration-color: #fed7aa; text-decoration-thickness: 8px;">Experience</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $resume->experience }}</div>
                        </div>
                        @endif

                        @if($resume->education)
                        <div class="mb-4">
                            <h3 class="bold" style="font-size: 24px; color: #7c2d12; margin: 0 0 14px 0; text-decoration: underline; text-decoration-color: #fed7aa; text-decoration-thickness: 8px;">Education</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $resume->education }}</div>
                        </div>
                        @endif

                        @if($projects)
                        <div class="mb-4">
                            <h3 class="bold" style="font-size: 24px; color: #7c2d12; margin: 0 0 14px 0; text-decoration: underline; text-decoration-color: #fed7aa; text-decoration-thickness: 8px;">Projects</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $projects }}</div>
                        </div>
                        @endif
                    </td>
                    <td style="width: 33%; padding-left: 10px;">
                        @if(count($skillsList) > 0)
                        <div class="avoid-break">
                            <h3 class="bold" style="font-size: 24px; color: #7c2d12; margin: 0 0 14px 0; text-decoration: underline; text-decoration-color: #fed7aa; text-decoration-thickness: 8px;">Skills</h3>
                            @foreach($skillsList as $skill)
                                <div style="font-size: 12px; font-weight: bold; color: #c2410c; background-color: #ffedd5; padding: 8px 14px; border-radius: 8px; margin-bottom: 10px; display: block;">{{ $skill }}</div>
                            @endforeach
                        </div>
                        @endif

                        @if($activityDetails)
                        <div class="avoid-break" style="margin-top: 20px;">
                            <h3 class="bold" style="font-size: 24px; color: #7c2d12; margin: 0 0 14px 0; text-decoration: underline; text-decoration-color: #fed7aa; text-decoration-thickness: 8px;">{{ $activityLabel }}</h3>
                            <div style="font-size: 13px; color: #334155; white-space: pre-wrap; line-height: 1.65;">{{ $activityDetails }}</div>
                        </div>
                        @endif
                    </td>
                </tr>
            </table>
        </div>
    </div>

@elseif(str_contains($templateStr, 'startup') || str_contains($templateStr, 'tech'))
    <!-- ==================== STARTUP / TECH TEMPLATE ==================== -->
    <div class="sans" style="background-color: #0f172a; color: #cbd5e1; padding: 40px; min-height: 100vh;">
        <div style="border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 30px;">
            <table style="width: 100%;">
                <tr>
                    <td style="vertical-align: bottom;">
                        <h1 class="bold" style="font-size: 36px; margin: 0; color: #34d399; letter-spacing: -1px;">{{ $resume->full_name ?: 'Your Name' }}</h1>
                        @if($resume->title)
                        <div style="color: #94a3b8; font-size: 16px; margin-top: 5px;">{{ $resume->title }}</div>
                        @endif
                    </td>
                    <td style="text-align: right; vertical-align: bottom; color: #94a3b8; font-size: 13px;">
                        @if($resume->email) <div>{{ $resume->email }}</div> @endif
                        @if($resume->phone) <div>{{ $resume->phone }}</div> @endif
                    </td>
                </tr>
            </table>
        </div>

        @if($resume->summary)
        <div class="mb-4" style="background-color: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <div style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">{{ $resume->summary }}</div>
        </div>
        @endif

        <table>
            <tr>
                <td style="width: 33%; padding-right: 30px;">
                    @if(count($skillsList) > 0)
                    <div class="avoid-break mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; color: #34d399; letter-spacing: 2px; margin-bottom: 15px;">
                            <span style="display: inline-block; width: 16px; height: 2px; background-color: #34d399; margin-bottom: 4px; margin-right: 8px;"></span>SKILLS
                        </h3>
                        @foreach($skillsList as $skill)
                            <div style="font-size: 12px; font-weight: bold; color: #6ee7b7; background-color: rgba(6, 78, 59, 0.3); border: 1px solid rgba(6, 78, 59, 0.5); padding: 6px 12px; border-radius: 4px; margin-bottom: 8px; display: inline-block;">{{ $skill }}</div><br/>
                        @endforeach
                    </div>
                    @endif

                    @if($resume->education)
                    <div class="mb-4 pt-4">
                        <h3 class="uppercase bold" style="font-size: 13px; color: #34d399; letter-spacing: 2px; margin-bottom: 15px;">
                            <span style="display: inline-block; width: 16px; height: 2px; background-color: #34d399; margin-bottom: 4px; margin-right: 8px;"></span>EDU
                        </h3>
                        <div style="font-size: 13px; color: #94a3b8; white-space: pre-wrap; line-height: 1.6;">{{ $resume->education }}</div>
                    </div>
                    @endif

                    @if($activityDetails)
                    <div class="mb-4 pt-4">
                        <h3 class="uppercase bold" style="font-size: 13px; color: #34d399; letter-spacing: 2px; margin-bottom: 15px;">
                            <span style="display: inline-block; width: 16px; height: 2px; background-color: #34d399; margin-bottom: 4px; margin-right: 8px;"></span>{{ $activityLabel }}
                        </h3>
                        <div style="font-size: 13px; color: #94a3b8; white-space: pre-wrap; line-height: 1.6;">{{ $activityDetails }}</div>
                    </div>
                    @endif
                </td>
                <td style="width: 67%; padding-left: 30px; border-left: 1px solid #1e293b;">
                    @if($resume->experience)
                    <div>
                        <h3 class="uppercase bold" style="font-size: 13px; color: #34d399; letter-spacing: 2px; margin-bottom: 15px;">
                            <span style="display: inline-block; width: 32px; height: 2px; background-color: #34d399; margin-bottom: 4px; margin-right: 8px;"></span>EXPERIENCE
                        </h3>
                        <div style="font-size: 14px; color: #cbd5e1; white-space: pre-wrap; line-height: 1.6;">{{ $resume->experience }}</div>
                    </div>
                    @endif

                    @if($projects)
                    <div class="mt-4">
                        <h3 class="uppercase bold" style="font-size: 13px; color: #34d399; letter-spacing: 2px; margin-bottom: 15px;">
                            <span style="display: inline-block; width: 32px; height: 2px; background-color: #34d399; margin-bottom: 4px; margin-right: 8px;"></span>PROJECTS
                        </h3>
                        <div style="font-size: 14px; color: #cbd5e1; white-space: pre-wrap; line-height: 1.6;">{{ $projects }}</div>
                    </div>
                    @endif
                </td>
            </tr>
        </table>
    </div>

@elseif(str_contains($templateStr, 'modern it'))
    <!-- ==================== MODERN IT TEMPLATE ==================== -->
    <div class="sans">
        <div style="background-color: #0f172a; padding: 40px; color: white;">
            <h1 class="uppercase bold" style="font-size: 36px; margin: 0 0 5px 0; color: #f8fafc; letter-spacing: 1px;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: #38bdf8; font-size: 16px; margin-bottom: 15px;">{{ $resume->title ?: 'Software Professional' }}</div>
            <div style="color: #cbd5e1; font-size: 13px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;|&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        <div style="padding: 40px;">
            <table>
                <tr>
                    <td style="width: 30%; padding-right: 30px; border-right: 2px solid #e2e8f0;">
                        @if(count($skillsList) > 0)
                        <div class="avoid-break mb-4">
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0284c7; margin-bottom: 15px;">Tech Stack</h3>
                            @foreach($skillsList as $skill)
                                <div style="font-size: 12px; color: #f0f9ff; background-color: #0f172a; padding: 4px 8px; margin-bottom: 6px; display: inline-block; border-left: 2px solid #38bdf8;">{{ $skill }}</div><br/>
                            @endforeach
                        </div>
                        @endif

                        @if($resume->education)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0284c7; margin-bottom: 15px;">Education</h3>
                            <div style="font-size: 13px; color: #475569; white-space: pre-wrap;">{{ $resume->education }}</div>
                        </div>
                        @endif

                        @if($activityDetails)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0284c7; margin-bottom: 15px;">{{ $activityLabel }}</h3>
                            <div style="font-size: 13px; color: #475569; white-space: pre-wrap;">{{ $activityDetails }}</div>
                        </div>
                        @endif
                    </td>
                    <td style="width: 70%; padding-left: 30px;">
                        @if($resume->summary)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px;">Profile</h3>
                            <div style="font-size: 14px; color: #334155; line-height: 1.6;">{{ $resume->summary }}</div>
                        </div>
                        @endif

                        @if($resume->experience)
                        <div>
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px;">Experience</h3>
                            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $resume->experience }}</div>
                        </div>
                        @endif

                        @if($projects)
                        <div class="mt-4">
                            <h3 class="uppercase bold" style="font-size: 14px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px;">Projects</h3>
                            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $projects }}</div>
                        </div>
                        @endif
                    </td>
                </tr>
            </table>
        </div>
    </div>

@else
    <!-- ==================== FALLBACK MINIMAL TEMPLATE ==================== -->
    <div class="serif" style="padding: 40px;">
        <div style="border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 32px; font-weight: normal; margin: 0 0 5px 0; color: #111;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: #666; font-size: 14px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;&bull;&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        <table>
            <tr>
                <td style="width: 30%; padding-right: 30px;">
                    @if(count($skillsList) > 0)
                    <div class="avoid-break mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Skills</h3>
                        @foreach($skillsList as $skill)
                            <div style="font-size: 13px; color: #444; margin-bottom: 5px;">{{ $skill }}</div>
                        @endforeach
                    </div>
                    @endif

                    @if($resume->education)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Education</h3>
                        <div style="font-size: 13px; color: #444; white-space: pre-wrap;">{{ $resume->education }}</div>
                    </div>
                    @endif

                    @if($activityDetails)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">{{ $activityLabel }}</h3>
                        <div style="font-size: 13px; color: #444; white-space: pre-wrap;">{{ $activityDetails }}</div>
                    </div>
                    @endif
                </td>
                <td style="width: 70%; padding-left: 30px; border-left: 1px solid #eee;">
                    @if($resume->summary)
                    <div class="mb-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Professional Summary</h3>
                        <div style="font-size: 13px; color: #333; line-height: 1.6;">{{ $resume->summary }}</div>
                    </div>
                    @endif

                    @if($resume->experience)
                    <div>
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Experience</h3>
                        <div style="font-size: 13px; color: #333; white-space: pre-wrap; line-height: 1.6;">{{ $resume->experience }}</div>
                    </div>
                    @endif

                    @if($projects)
                    <div class="mt-4">
                        <h3 class="uppercase bold" style="font-size: 13px; letter-spacing: 1px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Projects</h3>
                        <div style="font-size: 13px; color: #333; white-space: pre-wrap; line-height: 1.6;">{{ $projects }}</div>
                    </div>
                    @endif
                </td>
            </tr>
        </table>
    </div>
@endif

</body>
</html>
