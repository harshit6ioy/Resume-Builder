<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use App\Models\Resume;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $connection = 'mongodb';

    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_verified',
        
    ];

    protected $hidden = [
        'password',
    ];

    // ONE USER -> MANY RESUMES
    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }
}