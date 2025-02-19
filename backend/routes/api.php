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

    // get all users
    Route::get('/users', [AdminController::class, 'getAllUsers'])->name('allUsers');
    // get all admins
    Route::get('/admins', [AdminController::class, 'getAllAdmins'])->name('allAdmins');
    // get all admins and users
    Route::get('/adminsAndUsers', [AdminController::class, 'getAllAdminsAndUsers'])->name('allAdminsAndUsers');
    // delete user by id
    Route::delete('/user/{id}', [AdminController::class, 'deleteUserById'])->name('deleteUser');
    // get total users (integer)
    Route::get('/totalUsers', [AdminController::class, 'getTotalUsers'])->name('totalUsers');
    // get total admins (integer)
    Route::get('/totalAdmins', [AdminController::class, 'getTotalAdmins'])->name('totalAdmins');
    // get total admins and users (integer)
    Route::get('/totalAdminsAndUsers', [AdminController::class, 'getTotalAdminsAndUsers'])->name('totalAdminsAndUsers');
    // update user by id
    Route::put('/user/{id}', [AdminController::class, 'updateUser'])->name('updateUser');
    // add user
    Route::post('/user', [AdminController::class, 'addUser'])->name('addUser');
});


Route::prefix('v1')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'Everything is working fine'], 200);
    });

    Route::post('/login', [UserAuthController::class, 'login'])->name('login');
    Route::post('/signup', [UserAuthController::class, 'signup'])->name('signup');
});
