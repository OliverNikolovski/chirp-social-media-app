<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()
            ->has(Comment::factory()->count(20))
            ->count(100)
            ->create();

        Post::factory()
            ->has(Comment::factory()->count(10))
            ->count(200)
            ->create();

        Post::factory()
            ->has(Comment::factory()->count(50))
            ->count(50)
            ->create();
    }
}
