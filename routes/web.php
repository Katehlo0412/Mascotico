<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VeterinarioController;
use App\Http\Controllers\PeluqueriaController;
use App\Http\Controllers\GuarderiaController;
use App\Http\Controllers\PaseadorController;
use App\Http\Controllers\EntrenamientoController;
use App\Http\Controllers\RescateController;

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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});





require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
