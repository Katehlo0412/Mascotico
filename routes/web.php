<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\PeluqueriaController;
use App\Http\Controllers\GuarderiaController;
use App\Http\Controllers\PaseadorController;
use App\Http\Controllers\EntrenamientoController;
use App\Http\Controllers\RescateController;
use App\Http\Controllers\AnimalController;

use App\Http\Controllers\AdopcionController;

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ContactoController;


Route::get('/', function () {
    return Inertia::render('home');
})->name('home');



Route::get('/veterinarios', [VeterinarioController::class, 'index'])->name('veterinarios');
Route::get('/veterinarios/buscar', [VeterinarioController::class, 'buscar'])->name('veterinarios.buscar');

Route::get('/peluquerias', [PeluqueriaController::class, 'index'])->name('peluquerias.index');

Route::get('/guarderias', [GuarderiaController::class, 'index'])->name('guarderias.index');

Route::get('/paseadores', [PaseadorController::class, 'index'])->name('paseadores.index');

Route::get('/entrenamientos', [EntrenamientoController::class, 'index'])->name('entrenamientos.index');

Route::get('/rescate', [RescateController::class, 'index'])->name('rescate.index');

Route::get('/adopciones', [AdopcionController::class, 'index'])->name('adopciones');

Route::get('/consejos', function () {
    return Inertia::render('consejos');
})->name('consejos');

Route::get('/comunidad', function () {
    return Inertia::render('comunidad');
})->name('comunidad');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::apiResource('animales', AnimalController::class);

Route::get('/tienda', function () {
    return Inertia::render('tienda');
})->name('tienda');



Route::middleware(['auth'])->group(function () {
    Route::get('/mi-cuenta', function () {
        return Inertia::render('mi-cuenta', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    })->name('mi-cuenta');
});

Route::get('/productos/crud', function () {
    return Inertia::render('ProductosCrud');
})->name('productos.crud');

Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
Route::get('/producto/{id}', function ($id) {
    return Inertia::render('producto', ['id' => (int)$id]);
})->name('producto.show');
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::get('/animales', [AnimalController::class, 'index']);
Route::post('/animales', [AnimalController::class, 'store']);
Route::put('/animales/{id}', [AnimalController::class, 'update']);
Route::delete('/animales/{id}', [AnimalController::class, 'destroy']);

Route::get('/animal/crud', function () {
    return Inertia::render('AnimalCrud');
});

Route::get('/productos/{producto}/reviews', [ReviewController::class, 'index']);
Route::post('/productos/{producto}/reviews', [ReviewController::class, 'store']);
Route::post('/solicitud-adopcion', [\App\Http\Controllers\SolicitudAdopcionController::class, 'enviar'])->name('solicitud.adopcion');
Route::post('/contacto', [ContactoController::class, 'store']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
