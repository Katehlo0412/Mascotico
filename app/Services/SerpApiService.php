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

        return $this->realizarBusqueda($params);
    }

    public function buscarPeluqueriasMascotas($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'peluquerías de mascotas cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        return $this->realizarBusqueda($params);
    }

    public function buscarGuarderiasMascotas($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'residencias y guarderías de mascotas cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        return $this->realizarBusqueda($params);
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

        return $this->realizarBusqueda($params);
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

        return $this->realizarBusqueda($params);
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

        return $this->realizarBusqueda($params);
    }

    public function buscarAdopciones($ubicacion = 'Murcia')
    {
        $params = [
            'engine' => 'google_maps',
            'q' => 'adopciones de mascotas cerca de ' . $ubicacion,
            'type' => 'search',
            'api_key' => $this->apiKey,
            'hl' => 'es',
            'gl' => 'es',
        ];

        return $this->realizarBusqueda($params);
    }

    private function realizarBusqueda($params)
    {
        try {
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

            // Si la respuesta no fue exitosa, obtener más detalles
            $errorData = $response->json();
            $errorMessage = $errorData['error'] ?? $response->status() . ' - ' . $response->body();
            return ['error' => 'Error en la API: ' . $errorMessage];

        } catch (\Exception $e) {
            return ['error' => 'Error de conexión: ' . $e->getMessage()];
        }
    }
}
