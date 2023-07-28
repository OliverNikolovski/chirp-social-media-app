<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Exception;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @throws Exception
     */
    public function run(): void
    {
        Post::all()->each(function ($post) {
            Like::factory()->count(random_int(1, 10))->create(['type' => 'p', 'post_id' => $post->id]);
        });

        // And each comment to have between 1 and 5 likes.
        Comment::all()->each(function ($comment) {
            Like::factory()->count(random_int(1, 5))->create(['type' => 'c', 'comment_id' => $comment->id]);
        });
    }
}
