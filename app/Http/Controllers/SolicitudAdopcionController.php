<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\SolicitudAdopcionMail;

class SolicitudAdopcionController extends Controller
{
    public function enviar(Request $request)
    {
        $data = $request->validate([
            'animal_nombre' => 'required|string',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'correo' => 'required|email',
            'telefono' => 'required|string',
            'mensaje' => 'nullable|string',
        ]);

        $destino = 'mascoticocontacto@gmail.com';

        try {
            Mail::to($destino)->send(new SolicitudAdopcionMail($data));
        } catch (\Exception $e) {
            Log::error('Error al enviar correo: ' . $e->getMessage());
            return response()->json(['ok' => false, 'error' => $e->getMessage()]);
        }

        return response()->json(['ok' => true]);
    }
}
