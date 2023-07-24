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
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'text_content' => $this->text_content,
            'image' => $this->image ? asset($this->image) : null,
            'type' => $this->type,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'likes' => LikeResource::collection($this->whenLoaded('likes')),
            'shares' => PostResource::collection($this->whenLoaded('shares')),
            'sharedPost' => new PostResource($this->whenLoaded('sharedPost')),
            'sharedComment' => new CommentResource($this->whenLoaded('sharedComment'))
        ];
    }
}
