<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = [
        'nombre',
        'marca',
        'descripcion',
        'precio',
        'imagen',
        'tipo',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
