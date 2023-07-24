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
            'user_id' => $this->user_id,
            'post_id' => $this->post_id,
            'parent_comment_id' => $this->parent_comment_id,
            'created_at' => $this->created_at,
            'text_content' => $this->text_content,
            'image' => $this->image ? asset($this->image) : null,
            'child_comments' => CommentResource::collection($this->whenLoaded('childComments')),
            'likes' => LikeResource::collection($this->whenLoaded('likes')),
            'shares' => PostResource::collection($this->whenLoaded('shares'))
        ];
    }
}
