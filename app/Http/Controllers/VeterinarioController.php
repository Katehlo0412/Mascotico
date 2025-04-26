<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SerpApiService;
use Inertia\Inertia;

class VeterinarioController extends Controller
{
    protected $serpApiService;

    public function __construct(SerpApiService $serpApiService)
    {
        $this->serpApiService = $serpApiService;
    }

    public function index(Request $request)
{
    $ubicacion = $request->input('ubicacion', null); // ubicacion por defecto
    $resultados = [];

    if ($ubicacion) {
        $resultados = $this->serpApiService->buscarVeterinarios($ubicacion);
    }

    return Inertia::render('veterinarios', [
        'resultados' => $resultados['local_results'] ?? [],
        'ubicacion' => $ubicacion,
        'error' => $resultados['error'] ?? null,
    ]);
}
}
