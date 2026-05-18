<!DOCTYPE html>
<html>
<head>
    <title>Resume</title>

    <style>

        body{
            font-family: Arial;
            padding: 30px;
        }

        h1{
            color: blue;
        }

        .section{
            margin-top: 20px;
        }

    </style>
</head>
<body>

    <h1>{{ $resume->full_name }}</h1>

    <p>Email: {{ $resume->email }}</p>

    <p>Phone: {{ $resume->phone }}</p>

    <div class="section">

        <h2>Skills</h2>

        <p>
            {{ is_array($resume->skills) ? implode(', ', $resume->skills) : $resume->skills }}
        </p>

    </div>

    <div class="section">

        <h2>Education</h2>

        <p>{{ $resume->education }}</p>

    </div>

    <div class="section">

        <h2>Experience</h2>

        <p>{{ $resume->experience }}</p>

    </div>

</body>
</html>