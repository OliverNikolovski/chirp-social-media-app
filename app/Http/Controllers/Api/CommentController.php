<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentCollection;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function index(Request $request): JsonResponse|CommentCollection
    {
        $loggedInUserId = auth()->id();
        $postId = $request->query('post_id');

        if (!$postId) {
            return response()->json(['error' => 'Missing post_id query parameter.'], 400);
        }

        $comments = Comment::where('post_id', $postId)
            ->where('parent_comment_id', null)
            ->with(['user', 'likes' => function ($query) use ($loggedInUserId) {
                $query->where('user_id', $loggedInUserId);
            }])
            ->withCount(['likes', 'comments', 'shares'])
            ->orderBy('created_at', 'desc')  // Order by date from newest to oldest
            ->paginate(10)  // Paginate results, 10 per page
            ->appends($request->query());  // Append all request query parameters except 'page'
            //->appends($request->except('page'));

        return new CommentCollection($comments);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request): CommentResource|JsonResponse
    {
        $attributes = $request->all();
        $path = null;

        if ($request->file('image') != null)
            $path = $request->file('image')->store('comment-images');

        if ($path === false)
            return response()->json(['message' => 'There was a problem with the comment image.'], 500);


        $attributes['user_id'] = auth()->id();
        $attributes['image'] = $path;
        return new CommentResource(Comment::create($attributes));
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment): CommentResource
    {
        $loadMissing = ['likes', 'shares'];

        if (request()->query('loadChildren'))
            $loadMissing[] = 'childComments';

        return new CommentResource($comment->loadMissing($loadMissing));
    }

    /**
     * Update the specified resource in storage.
     * @throws AuthorizationException
     */
    public function update(UpdateCommentRequest $request, Comment $comment): Application|Response|JsonResponse|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $this->authorize('update', $comment);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('comment-images');
            $data['image'] = $path;
        }
        else {
            $data['image'] = null;
        }

        if ($comment->update($data))
            return response()->json(new CommentResource($comment));
        else
            return response()->setStatusCode(400);
    }

    /**
     * Remove the specified resource from storage.
     * @throws AuthorizationException
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $this->authorize('delete', $comment);

        if ($comment->delete())
            return response()->json(['message' => 'Comment deleted successfully']);
        else
            return response()->json(['message' => 'There was a problem deleting the comment'])->setStatusCode(500);

    }

    public function childComments(Request $request, int $id): JsonResponse|CommentCollection
    {
        $loggedInUserId = auth()->id();

        $comments = Comment::where('parent_comment_id', $id)
            ->with(['user', 'likes' => function ($query) use ($loggedInUserId) {
                $query->where('user_id', $loggedInUserId);
            }])
            ->withCount(['likes', 'comments', 'shares'])
            ->orderBy('created_at', 'desc')  // Order by date from newest to oldest
            ->paginate(10)  // Paginate results, 10 per page
            ->appends($request->query());  // Append all request query parameters except 'page'

        return new CommentCollection($comments);
    }
}
