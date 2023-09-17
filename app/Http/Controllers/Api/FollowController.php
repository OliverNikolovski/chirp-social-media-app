<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFollowRequest;
use App\Models\Follow;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{

    public function store(StoreFollowRequest $request): JsonResponse
    {
        try {
            $follow = new Follow($request->validated());
            $follow->follower_id = auth()->id();
;
            $follow->save();

            return response()->json(['message' => 'Follow successful', 'follow' => $follow]);

        } catch (Exception $e) {
            return response()->json(['message' => 'Follow unsuccessful', 'error' => $e->getMessage()])->setStatusCode(422);
        }
    }


    /**
     * @throws AuthorizationException
     */
    public function destroy(Follow $follow): JsonResponse
    {
        $this->authorize('delete', $follow);

        try {
            $follow->delete();
            return response()->json(['message' => 'Unfollow successful']);
        } catch (Exception $e) {
            return response()
                ->json(['message' => 'There was a problem: ' . $e->getMessage()])
                ->setStatusCode(422);
        }
    }

    public function checkFollow(Request $request, $follower_id, $followed_id): JsonResponse
    {
        $follow = DB::table('follows')
            ->where('follower_id', $follower_id)
            ->where('followed_id', $followed_id)
            ->first();

        $isFollowing = $follow !== null;

        return response()->json([
            'is_following' => $isFollowing,
            'follow' => $follow,
        ]);
    }

}
