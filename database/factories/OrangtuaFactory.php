<?php

namespace Database\Factories;

use App\Models\Orangtua;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrangtuaFactory extends Factory
{
    protected $model = Orangtua::class;

    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'no_telpon' => fake()->phoneNumber(),
            'siswa_id' => Siswa::pluck('id')->random(),
        ];
    }
}
