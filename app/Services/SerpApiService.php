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
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }

    public function buscarPeluqueriasCaninas($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'peluquerías caninas cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }

    public function buscarGuarderiasCaninas($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'guarderías caninas cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }

    public function buscarPaseadoresDePerros($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'paseadores de perros cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }

    public function buscarEntrenamientosCaninos($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'entrenamientos caninos cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }

    public function buscarRescateAnimal($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'rescate animal cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        $response = Http::withoutVerifying()->get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            $data = $response->json();

            
            if (isset($data['local_results'])) {
                foreach ($data['local_results'] as &$result) {
                    $result['link'] = $result['link'] ?? $result['website'] ?? null;
                }
            }

            return $data;
        }

        return ['error' => 'No se pudo obtener resultados'];
    }
}
