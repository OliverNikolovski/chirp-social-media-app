<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'username' => $this->user->username,
                'profile_picture' => $this->user->profile_picture ? asset($this->user->profile_picture) : null,
            ],
            'created_at' => $this->created_at,
            'text_content' => $this->text_content,
            'image' => $this->image ? asset($this->image) : null,
            'type' => $this->type,
            'likes_count' => $this->likes_count,
            'shares_count' => $this->shares_count,
            'comments_count' => $this->comments_count,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'sharedPost' => new PostResource($this->whenLoaded('sharedPost')),
            'sharedComment' => new CommentResource($this->whenLoaded('sharedComment')),
            'like_id' => $this->likes->isNotEmpty() ? $this->likes->first()->id : null
        ];
    }
}
