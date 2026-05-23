<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$skill = 'Software';
$regex = new \MongoDB\BSON\Regex($skill, 'i');

$resumes = \App\Models\Resume::where('is_public', true)
    ->where(function($query) use ($regex) {
        $query->where('skills', 'regex', $regex)
              ->orWhere('title', 'regex', $regex);
    })
    ->get();

echo "Found: " . count($resumes) . "\n";
