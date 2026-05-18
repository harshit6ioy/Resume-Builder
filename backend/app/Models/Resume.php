<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Resume extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'resumes';

    protected $fillable = [

        'user_id',

        'title',

        'full_name',

        'email',

        'phone',

        'skills',

        'education',

        'experience',

        'industry',

        'template',
        'is_public',
        'share_link',

    ];

    // RELATION
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}