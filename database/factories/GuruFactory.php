<?php

namespace Database\Factories;

use App\Models\Guru;

use Illuminate\Database\Eloquent\Factories\Factory;

class GuruFactory extends Factory
{
    protected $model = Guru::class;

    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'no_telpon' => fake()->phoneNumber(),
            'email' => fake()->email(),
        ];
    }
}
