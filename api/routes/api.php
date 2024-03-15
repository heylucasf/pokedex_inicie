<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('pokedex')->group(function () {
    Route::get('', [\App\Http\Controllers\PokedexController::class, 'index']);
    Route::get('maisProcurados', [\App\Http\Controllers\PokedexController::class, 'maisProcurados']);
    Route::get('procuraPoke/{poke}', [\App\Http\Controllers\PokedexController::class, 'procuraPoke']);
    Route::get('{param}', [\App\Http\Controllers\PokedexController::class, 'show']);
});
