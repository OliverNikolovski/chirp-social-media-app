<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(StoreUserRequest $request): Application|Response|JsonResponse|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $profile_picture = $request->file('profile_picture');
        $path = null;
        if ($profile_picture)
            $path = $request->file('profile_picture')->store('profile-pictures');

        if ($path === false)
            return response()->json(['message' => 'The profile picture could not be stored. Registration failed.'], 500);

        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'username' => $request->input('username'),
                'password' => Hash::make($request->input('password')),
                'bio' => $request->input('bio'),
                'location' => $request->input('location'),
                'website' => $request->input('website'),
                'birthdate' => $request->input('birthdate'),
                'profile_picture' => $path,
            ]);

            $access_token = $user->createToken('chirp api token')->plainTextToken;

            DB::commit();
        } catch (Exception) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to register the user.'], 500);
        }

        Auth::attempt($request->only('username', 'password'));
        return response(['access_token' => $access_token], 201);
    }

    /**
     * @throws ValidationException
     */
    public function login(Request $request): Application|Response|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user();
            $access_token = $user->createToken('chirp api token')->plainTextToken;
            return response(['access_token' => $access_token], 200);
        } else {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        // Revoke current token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function logoutFromAllDevices(Request $request): JsonResponse
    {
        // Get user who initiated the request
        $user = $request->user();

        // Revoke all tokens...
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out from all devices successfully']);
    }

    public function getAuthenticatedUser(): UserResource|null
    {
        /** @var User $user */
        $user = auth()->user();
        return $user ? new UserResource($user) : null;
    }

}
