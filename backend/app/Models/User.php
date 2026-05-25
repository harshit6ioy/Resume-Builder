<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Auth\User as Authenticatable;

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
        'email_verification_otp',
        'email_verification_expires_at',
        'password_reset_otp',
        'password_reset_expires_at',
    ];

    protected $hidden = [
        'password',
        'email_verification_otp',
        'password_reset_otp',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
        'email_verification_expires_at' => 'datetime',
        'password_reset_expires_at' => 'datetime',
    ];

    // ONE USER -> MANY RESUMES
    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }
}
