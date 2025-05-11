<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SerpApiService;
use Inertia\Inertia;

class PeluqueriaController extends Controller
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
            $resultados = $this->serpApiService->buscarPeluqueriasCaninas($ubicacion);
        }

        return Inertia::render('peluquerias', [
            'resultados' => $resultados['local_results'] ?? [],
            'ubicacion' => $ubicacion,
            'error' => $resultados['error'] ?? null,
        ]);
    }
}
