<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FollowController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-from-all-devices', [AuthController::class, 'logoutFromAllDevices']);
    Route::get('/authentication', [AuthController::class, 'getAuthenticatedUser']);
    Route::get('/comments/{id}/child-comments', [CommentController::class, 'childComments']);
    Route::get('/users/{id}/posts', [UserController::class, 'getUserPosts']);
    Route::get('/follow/check/{follower_id}/{followed_id}', [FollowController::class, 'checkFollow']);
    Route::get('/users/search', [UserController::class, 'searchUsers']);
    Route::get('/users/followers', [UserController::class, 'getFollowers']);
    Route::get('/users/following', [UserController::class, 'getFollowing']);
});

Route::group(['namespace' => 'App\Http\Controllers\Api', 'middleware' => 'auth:sanctum'], function () {
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comments', CommentController::class);
    Route::apiResource('likes', LikeController::class);
    Route::apiResource('follow', FollowController::class);
    Route::apiResource('users', UserController::class);
});




