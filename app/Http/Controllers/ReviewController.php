<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Producto;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($productoId)
    {
        return Review::where('producto_id', $productoId)->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request, $productoId)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Debes iniciar sesión para dejar una reseña.'], 401);
        }

        $validated = $request->validate([
            'comentario' => 'required|string',
            'puntuacion' => 'required|integer|min:1|max:5',
        ]);

        $review = \App\Models\Review::create([
            'producto_id' => $productoId,
            'usuario' => auth()->user()->name, // <-- nombre real del usuario autenticado
            'comentario' => $validated['comentario'],
            'puntuacion' => $validated['puntuacion'],
        ]);

        return response()->json($review);
    }
}
