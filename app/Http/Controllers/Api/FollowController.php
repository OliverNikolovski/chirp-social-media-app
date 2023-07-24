<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFollowRequest;
use App\Models\Follow;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;

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
}
