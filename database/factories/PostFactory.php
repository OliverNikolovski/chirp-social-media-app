<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $userIds;

        if (!isset($userIds))
            $userIds = User::all()->pluck('id')->toArray();

        $rand = $this->faker->randomFloat(1, 0, 1);

        if ($rand < 0.7)
            $type = 'p';
        else
            $type = 's';

        $typeChanceGenerator = $type === 'p' ? $this->faker->optional(0.8) : $this->faker->optional(0.4);
        $text_content = $typeChanceGenerator->realTextBetween(50, 250);
        $image = $text_content ? $this->faker->optional(0.3)->imageUrl() : $this->faker->imageUrl();
        $userId = $this->faker->randomElement($userIds);

        return [
            'user_id' => $userId,
            'type' => $type,
            'text_content' => $text_content,
            'image' => $image,
        ];
    }
}
