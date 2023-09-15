<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MoviesController;

Route::get('/movies',[App\Http\Controllers\MoviesController::class, 'index']);

Route::post('/save',[App\Http\Controllers\MoviesController::class, 'store']);

Route::put('/update/{id}',[App\Http\Controllers\MoviesController::class, 'update']);

Route::delete('/delete/{id}',[App\Http\Controllers\MoviesController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
