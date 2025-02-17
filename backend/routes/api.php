<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserAuthController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// For Admin
Route::middleware(['auth:sanctum', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
    Route::get('/users', [AdminController::class, 'getAllUsers'])->name('allUsers');
    Route::get('/admins', [AdminController::class, 'getAllAdmins'])->name('allAdmins');
    Route::delete('/user/{id}', [AdminController::class, 'deleteUserById'])->name('deleteUser');
    Route::get('/totalUsers', [AdminController::class, 'getTotalUsers'])->name('totalUsers');
    Route::get('/totalAdmins', [AdminController::class, 'getTotalAdmins'])->name('totalAdmins');
    Route::get('/totalAdminsAndUsers', [AdminController::class, 'getTotalAdminsAndUsers'])->name('totalAdminsAndUsers');
    Route::put('/user/{id}', [AdminController::class, 'updateUser'])->name('updateUser');
});


Route::prefix('v1')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'Everything is working fine'], 200);
    });

    Route::post('/login', [UserAuthController::class, 'login'])->name('login');
    Route::post('/signup', [UserAuthController::class, 'signup'])->name('signup');
});
