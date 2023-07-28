<?php

namespace Database\Factories;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Follow>
 */
class FollowFactory extends Factory
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

        $followerId = $this->faker->randomElement($userIds);
        $followedId = $this->faker->randomElement($userIds);

        return [
            'follower_id' => $followerId,
            'followed_id' => $followedId
        ];
    }
}
