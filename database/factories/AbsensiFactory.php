<?php

namespace Database\Factories;

use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

class AbsensiFactory extends Factory
{
    protected $model = Absensi::class;

    public function definition(): array
    {
        return [
            'siswa_id' => Siswa::pluck('id')->random(),
            'kelas_id' => Kelas::pluck('id')->random(),
            'tanggal' => $this->faker->dateTimeThisYear()->format('Y-m-d'),
            'status' => $this->faker->randomElement(['hadir', 'sakit', 'izin', 'alpha', 'terlambat']),
            'keterangan' => $this->faker->optional(0.3)->sentence(),
        ];
    }
}
