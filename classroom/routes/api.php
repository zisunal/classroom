<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppInfoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\ClassroomController;
use Laravel\Jetstream\Rules\Role;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/app-info', [AppInfoController::class, 'index']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/verify', [OtpController::class, 'verify']);
    Route::post('/send-otp', [OtpController::class, 'sendOtp']);
    Route::post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    });
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('create-class', [ClassroomController::class, 'createClass']);
    Route::post('get-teaching-classes', [ClassroomController::class, 'getTeachingClasses']);
});