<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\SendEmailController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Product*/
// Route::get('/products', [CategoriesController::class, 'index']);

// /* categories*/
// Route::get('/categories', [ProductsController::class, 'index']);
Route::get('/products', [CategoriesController::class, 'index']);


// Route::get('/rings', [ProductController::class, 'getRings']);

Route::get('/rings', [ProductsController::class, 'getRings']);
Route::get('/sunglassses', [ProductsController::class, 'getsunglassses']);
Route::get('/nacklaces', [ProductsController::class, 'getnacklaces']);
Route::get('/watches', [ProductsController::class, 'getwatches']);
Route::get('/allproducts', [ProductsController::class, 'getprodutcs']);


////// /* Carts */

Route::post('/cart', [CartController::class, 'addToCart']);
Route::get('/cart/{clientId}', [CartController::class, 'getCartItems']);

Route::post('/contact', [SendEmailController::class, 'sendContactForm']);

Route::post('/login', [ClientsController::class, 'login']);
Route::post('/register', [ClientsController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




