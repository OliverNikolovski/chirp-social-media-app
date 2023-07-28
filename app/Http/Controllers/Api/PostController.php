<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{

    public function index(Request $request): PostCollection
    {
        $loggedInUserId = auth()->id();

        // Get all posts from followed users
        $posts = Post::withCount(['likes', 'shares', 'comments'])
            ->whereIn('user_id', function ($query) use ($loggedInUserId) {
                $query->select('followed_id')
                    ->from('follows')
                    ->where('follower_id', $loggedInUserId);
            })
            ->orderBy('created_at', 'desc')  // Order by date from newest to oldest
            ->paginate()
            ->appends($request->query());

        return new PostCollection($posts);
    }


    public function store(StorePostRequest $request): JsonResponse|PostResource
    {
        $attributes = $request->validated();
        $path = null;

        if ($request->file('image') != null)
            $path = $request->file('image')->store('post-images');

        if ($path === false)
            return response()->json(['message' => 'There was a problem with the post image.'], 500);

        $attributes['user_id'] = auth()->id();
        $attributes['image'] = $path;
        return new PostResource(Post::create($attributes));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): PostResource
    {
        //$loadMissing = ['likes', 'shares', 'sharedPost', 'sharedComment'];
        $loadMissing = ['sharedPost', 'sharedComment'];

        if (request()->query('loadComments'))
            $loadMissing[] = 'comments';

        return new PostResource($post->loadMissing($loadMissing));
    }

    /**
     * Update the specified resource in storage.
     * @throws AuthorizationException
     */
    public function update(UpdatePostRequest $request, Post $post): Application|Response|JsonResponse|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $this->authorize('update', $post);

        $data = $request->only(['text_content', 'image']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('post-images');
            $data['image'] = $path;
        } else {
            $data['image'] = null;
        }

        if ($post->update($data)) {
            return response()->json(new PostResource($post));
        } else {
            return response()->setStatusCode(400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Authorization
        $this->authorize('delete', $post);

        // Delete the post

        if ($post->delete())
            return response()->json(['message' => 'Post deleted successfully']);
        else
            return response()->json(['message' => 'There was a problem deleting the post'])->setStatusCode(500);
    }

}
