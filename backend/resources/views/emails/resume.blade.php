<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
    <h2 style="margin-bottom: 8px;">Your resume is attached</h2>
    <p>Hi {{ $user->name }},</p>
    <p>Your resume "{{ $resume->title }}" is attached as a PDF.</p>
    <p>This email was sent to your login email address for security.</p>
</body>
</html>
