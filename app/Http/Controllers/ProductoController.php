<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    public function index()
    {
        return Producto::all();
    }
    
    public function show($id)
    {
        return \App\Models\Producto::findOrFail($id);
    }
}
