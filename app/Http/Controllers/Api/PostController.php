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

        $posts = Post::with(['user', 'sharedPost', 'sharedComment', 'likes' => function ($query) use ($loggedInUserId) {
            $query->where('user_id', $loggedInUserId);
        }])
            ->withCount(['likes', 'comments', 'shares'])
            ->where('user_id', '=', $loggedInUserId)
            ->orWhereIn('user_id', function ($query) use ($loggedInUserId) {
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

        $post = Post::create($attributes);

        $post->likes_count = 0;
        $post->comments_count = 0;
        $post->shares_count = 0;
        $post->load('user');
        $post->load('sharedPost');
        $post->load('sharedComment');

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): PostResource
    {
        $loggedInUserId = auth()->id();

        $loadMissing = ['sharedPost', 'sharedComment', 'user', 'likes' => function ($query) use ($loggedInUserId) {
            $query->where('user_id', $loggedInUserId);
        }];

        if (request()->query('loadComments'))
            $loadMissing[] = 'comments';

        $post->loadMissing($loadMissing);
        $post->loadCount(['likes', 'comments', 'shares']);

        return new PostResource($post);
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
