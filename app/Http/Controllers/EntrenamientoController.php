<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SerpApiService;
use Inertia\Inertia;

class EntrenamientoController extends Controller
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

        if ($ubicacion) {
            $resultados = $this->serpApiService->buscarEntrenamientosCaninos($ubicacion);
        }

        return Inertia::render('entrenamientos', [
            'resultados' => $resultados['local_results'] ?? [],
            'ubicacion' => $ubicacion,
            'error' => $resultados['error'] ?? null,
        ]);
    }
}
