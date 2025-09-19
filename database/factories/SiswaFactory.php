<?php

namespace Database\Factories;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Kela;
use Illuminate\Database\Eloquent\Factories\Factory;

class SiswaFactory extends Factory
{
    protected $model = Siswa::class;

    public function definition(): array
    {
            $jenisKelamin = fake()->randomElement(['Laki-laki', 'Perempuan']);

            return [
                'name' => fake()->name(),
                'jenis_kelamin' => $jenisKelamin,
                'kelas_id' => Kelas::pluck('id')->random(),
                'email' => fake()->unique()->safeEmail(),
                'no_telpon' => fake()->numerify('08##########'),
                'tanggal_lahir' => fake()->dateTimeBetween('-18 years', '-15 years')->format('Y-m-d'),
                'alamat' => fake()->address(),
            ];
    }
}
