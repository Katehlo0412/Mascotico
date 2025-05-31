<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SerpApiService;
use Inertia\Inertia;

class AdopcionController extends Controller
{
    protected $serpApiService;

    public function __construct(SerpApiService $serpApiService)
    {
        $this->serpApiService = $serpApiService;
    }

    public function index(Request $request)
    {
        $ubicacion = $request->input('ubicacion', null);
        $resultados = [];
        $error = null;

        if ($ubicacion) {
            $resultados = $this->serpApiService->buscarAdopciones($ubicacion);
            $error = $resultados['error'] ?? null;
        }

        return Inertia::render('adopciones', [
            'resultados' => $resultados['local_results'] ?? [],
            'ubicacion' => $ubicacion,
            'error' => $error,
        ]);
    }
}
