<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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

        $text_content = $this->faker->optional(0.8)->realTextBetween(5);
        $imageUrl = $text_content ?
            $this->faker->optional(0.3)->imageUrl()
            : $this->faker->imageUrl();
        $userId = $this->faker->randomElement($userIds);

        return [
            'text_content' => $text_content,
            'image' => $imageUrl,
            'user_id' => $userId,
        ];
    }
}
