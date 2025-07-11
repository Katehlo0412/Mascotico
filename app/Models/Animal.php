<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = [
        'nombre',
        'especie',
        'edad',
        'descripcion',
        'foto',
    ];
}
