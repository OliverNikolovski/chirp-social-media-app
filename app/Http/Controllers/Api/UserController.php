<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $followersCount = DB::table('follows')->where('followed_id', $user->id)->count();
        $followingCount = DB::table('follows')->where('follower_id', $user->id)->count();

        return [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'profile_picture' => $user->profile_picture ? asset($user->profile_picture) : null,
            'created_at' => $user->created_at,
            'bio' => $user->bio,
            'location' => $user->location,
            'website' => $user->website,
            'birthdate' => $user->birthdate,
            'followers_count' => $followersCount,
            'following_count' => $followingCount
        ];
    }


    public function getUserPosts(Request $request, $id): PostCollection
    {
        $posts = Post::with(['user', 'sharedPost', 'sharedComment'])
            ->withCount(['likes', 'comments', 'shares'])
            ->where('user_id', '=', $id)
            ->orderBy('created_at', 'desc')  // Order by date from newest to oldest
            ->paginate()
            ->appends($request->query());

        return new PostCollection($posts);
    }

    public function searchUsers(Request $request): JsonResponse
    {
        $searchString = $request->query('search');

        if ($searchString) {
            $users = User::where('name', 'ILIKE', '%' . $searchString . '%')
                ->orWhere('username', 'ILIKE', '%' . $searchString . '%')
                ->get();

            return response()->json($users);
        }

        return response()->json([]);
    }

    public function getFollowing(Request $request): JsonResponse
    {
        $loggedInUser = auth()->user();

        $following = $loggedInUser->following()->get();

        return response()->json(['following' => $following]);
    }


    public function getFollowers(Request $request): JsonResponse
    {
        $loggedInUser = auth()->user();

        $followers = $loggedInUser->followers()->get();

        return response()->json(['followers' => $followers]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
