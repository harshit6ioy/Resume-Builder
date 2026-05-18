<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Template extends Model
{
    protected $connection = 'mongodb';

    protected $collection = 'templates';

    protected $fillable = [

        'name',

        'industry',

        'layout',

        'colors',

        'preview_image',

        'sections'

    ];
}