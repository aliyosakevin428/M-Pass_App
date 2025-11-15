<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('laporan_nilais', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('nilai');
            $table->string('grade');
            $table->foreignId('siswa_id')->constrained('siswas')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('laporan_nilais');
    }
};
