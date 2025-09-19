<?php

namespace Database\Factories;

use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\Guru;
use Illuminate\Database\Eloquent\Factories\Factory;

class KelasFactory extends Factory
{
    protected $model = Kelas::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['10', '11', '12']),
            'guru_id' => Guru::pluck('id')->random(),
            'jurusan_id' => Jurusan::pluck('id')->random(),
        ];
    }
}
