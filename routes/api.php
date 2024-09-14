<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AutocompleteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('search')->group(function () {
    Route::post('/getCEP', [AutocompleteController::class, 'getCEP']);
    Route::post('/getCNPJ', [AutocompleteController::class, 'getCNPJ']);
});
