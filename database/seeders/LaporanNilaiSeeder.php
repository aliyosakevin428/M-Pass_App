<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LaporanNilai;

class LaporanNilaiSeeder extends Seeder
{
    public function run(): void
    {
        LaporanNilai::factory()->count(10)->create();
    }
}
