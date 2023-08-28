<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'post_id' => $this->post_id,
            'parent_comment_id' => $this->parent_comment_id,
            'created_at' => $this->created_at,
            'text_content' => $this->text_content,
            'image' => $this->image ? asset($this->image) : null,
            'child_comments' => CommentResource::collection($this->whenLoaded('childComments')),
            'likes_count' => $this->likes_count,
            'shares_count' => $this->shares_count,
            'comments_count' => $this->comments_count,
            'like_id' => $this->likes->isNotEmpty() ? $this->likes->first()->id : null
        ];
    }
}
