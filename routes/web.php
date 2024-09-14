<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckoutController;


Route::get('/', function () {
    return view('pages/form_cadastro', [
        'cart'  => true
    ]);
})->name('home');

Route::post('/cadastro', [CheckoutController::class, 'storeData'])->name('storeData');
Route::post('/pagamento', [CheckoutController::class, 'storePayment'])->name('storePayment');
