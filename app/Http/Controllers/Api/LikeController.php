<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLikeRequest;
use App\Http\Resources\LikeResource;
use App\Models\Like;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLikeRequest $request): JsonResponse|LikeResource
    {
        $attributes = $request->validated();
        $userId = auth()->id();
        $attributes['user_id'] = $userId;

        // Check if a like already exists
        $existingLike = Like::where('user_id', $userId)
            ->where('post_id', $attributes['post_id'] ?? null)
            ->where('comment_id', $attributes['comment_id'] ?? null)
            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'You have already liked this post/comment.'], 409); // 409 Conflict
        }

        return new LikeResource(Like::create($attributes));
    }


    /**
     * Remove the specified resource from storage.
     * @throws AuthorizationException
     */
    public function destroy(Like $like): JsonResponse
    {
        $this->authorize('delete', $like);

        try {
            $like->delete();
            return response()->json(['message' => 'Like removed successfully']);
        } catch (\Exception $e) {
            return response()
                ->json(['message' => 'There was a problem removing the like: ' . $e->getMessage()])
                ->setStatusCode(400);
        }
    }

}
