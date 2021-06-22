<?php
use Illuminate\Support\Facades\Route;
Route::prefix('v1')->group(function () {


    Route::post('auth/login', '\App\Http\Controllers\Api\AuthController@login');
    Route::post('auth/signup', '\App\Http\Controllers\Api\AuthController@signUp');
    Route::get('auth/social/{service}', '\App\Http\Controllers\Api\AuthController@getSocialUrl');
    Route::get('auth/social/{service}/callback', '\App\Http\Controllers\Api\AuthController@socialAutenticacion');

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::post('auth/logout', '\App\Http\Controllers\Api\AuthController@logout');
        Route::get('auth/current-user', '\App\Http\Controllers\Api\AuthController@currentUser');

        Route::apiResource('empresas', \App\Http\Controllers\Api\EmpresaController::class);
        Route::apiResource('empresas.clientes', \App\Http\Controllers\Api\ClienteController::class);
        Route::apiResource('empresas.clientes.direcciones', \App\Http\Controllers\Api\DireccionController::class);
    });
});

