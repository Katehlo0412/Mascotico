<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VeterinarioController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/veterinarios', [VeterinarioController::class, 'index'])->name('veterinarios');
Route::get('/veterinarios/buscar', [VeterinarioController::class, 'buscar'])->name('veterinarios.buscar');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// ruta para la vista de inicio: ejemplo
Route::get('/inicio', function () {
    return Inertia::render('home');
})->name('inicio');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
