<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Making 30% of all comments to be child comments
        Comment::all()->random(Comment::count() * 0.5)->each(function ($comment) {
            $parent_comment = Comment::where('id', '!=', $comment->id)->inRandomOrder()->first();
            $comment->update(['parent_comment_id' => $parent_comment->id]);
        });
    }
}
