<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SerpApiService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.serpapi.key');
    }

    public function buscarVeterinarios($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'veterinarios cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            return $response->json();
        }

        return ['error' => 'No se pudo obtener resultados'];
    }
}
