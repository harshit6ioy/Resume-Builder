<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ContactRequest extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'contact_requests';

    protected $fillable = [

        'recruiter_name',

        'candidate_email',

        'message'

    ];
}