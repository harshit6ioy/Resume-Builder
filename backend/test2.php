<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$skill = 'Software Engineer';
$resumes = \App\Models\Resume::where('is_public', true)
    ->where(function($query) use ($skill) {
        $query->where('skills', 'like', '%' . $skill . '%')
              ->orWhere('title', 'like', '%' . $skill . '%');
    })
    ->get();
echo "Found: " . count($resumes) . "\n";
