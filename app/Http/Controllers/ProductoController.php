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
    
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required',
            'marca' => 'required',
            'descripcion' => 'required',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|string',
            'tipo' => 'required',
        ]);
        return \App\Models\Producto::create($data);
    }

    public function update(Request $request, $id)
    {
        $producto = \App\Models\Producto::findOrFail($id);
        $data = $request->validate([
            'nombre' => 'required',
            'marca' => 'required',
            'descripcion' => 'required',
            'precio' => 'required|numeric',
            'imagen' => 'nullable|string',
            'tipo' => 'required',
        ]);
        $producto->update($data);
        return $producto;
    }

    public function destroy($id)
    {
        $producto = \App\Models\Producto::findOrFail($id);
        $producto->delete();
        return response()->json(['success' => true]);
    }
}
