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
@endphp

@if(str_contains($templateStr, 'minimal'))
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
                </td>
            </tr>
        </table>
    </div>

@elseif(str_contains($templateStr, 'corporate') || str_contains($templateStr, 'executive'))
    <!-- ==================== CORPORATE / EXECUTIVE TEMPLATE ==================== -->
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

        @if($resume->education)
        <div class="mb-4 avoid-break">
            <h3 class="uppercase bold" style="font-size: 14px; color: #1e293b; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-bottom: 15px;">Education</h3>
            <div style="font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">{{ $resume->education }}</div>
        </div>
        @endif
    </div>

@elseif(str_contains($templateStr, 'creative'))
    <!-- ==================== CREATIVE TEMPLATE ==================== -->
    <div class="sans">
        <div style="background-color: #fce7f3; padding: 50px 40px; border-bottom: 5px solid #ec4899;">
            <h1 class="bold" style="font-size: 42px; margin: 0 0 10px 0; color: #be185d; letter-spacing: -1px;">{{ $resume->full_name ?: 'Your Name' }}</h1>
            <div style="color: #9d174d; font-size: 16px; font-weight: bold; margin-bottom: 15px;">{{ $resume->title }}</div>
            <div style="color: #be185d; font-size: 13px;">
                @if($resume->email) <span>{{ $resume->email }}</span> @endif
                @if($resume->email && $resume->phone) <span> &nbsp;&bull;&nbsp; </span> @endif
                @if($resume->phone) <span>{{ $resume->phone }}</span> @endif
            </div>
        </div>

        <div style="padding: 40px;">
            <table>
                <tr>
                    <td style="width: 65%; padding-right: 30px;">
                        @if($resume->summary)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 16px; color: #db2777; margin-bottom: 15px;">Profile</h3>
                            <div style="font-size: 14px; color: #4c1d95; line-height: 1.7;">{{ $resume->summary }}</div>
                        </div>
                        @endif

                        @if($resume->experience)
                        <div>
                            <h3 class="uppercase bold" style="font-size: 16px; color: #db2777; margin-bottom: 15px;">Experience</h3>
                            <div style="font-size: 14px; color: #4c1d95; white-space: pre-wrap; line-height: 1.7;">{{ $resume->experience }}</div>
                        </div>
                        @endif
                    </td>
                    <td style="width: 35%; padding-left: 30px; border-left: 2px dashed #fbcfe8;">
                        @if(count($skillsList) > 0)
                        <div class="avoid-break mb-4">
                            <h3 class="uppercase bold" style="font-size: 16px; color: #db2777; margin-bottom: 15px;">Expertise</h3>
                            @foreach($skillsList as $skill)
                                <div style="font-size: 13px; font-weight: bold; color: #9d174d; background-color: #fdf2f8; padding: 6px 12px; border-radius: 20px; margin-bottom: 8px; display: inline-block;">{{ $skill }}</div><br/>
                            @endforeach
                        </div>
                        @endif

                        @if($resume->education)
                        <div class="mb-4">
                            <h3 class="uppercase bold" style="font-size: 16px; color: #db2777; margin-bottom: 15px;">Education</h3>
                            <div style="font-size: 13px; color: #4c1d95; white-space: pre-wrap;">{{ $resume->education }}</div>
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
                </td>
            </tr>
        </table>
    </div>

@else
    <!-- ==================== MODERN IT / DEFAULT TEMPLATE ==================== -->
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
                    </td>
                </tr>
            </table>
        </div>
    </div>
@endif

</body>
</html>