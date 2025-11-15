<?php

namespace Database\Factories;

use App\Models\LaporanNilai;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

class LaporanNilaiFactory extends Factory
{
    protected $model = LaporanNilai::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'nilai' => fake()->randomNumber(1, 100),
            'grade' => fake()->randomLetter(),
            'siswa_id' => Siswa::pluck('id')->random(),
        ];
    }
}
