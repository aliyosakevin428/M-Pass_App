<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAbsensiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'siswa_id' => 'nullable|exists:siswas,id',
            'kelas_id' => 'nullable|exists:kelas,id',
            'tanggal' => 'nullable|date',
            'status' => 'nullable|in:hadir,sakit,izin,alpha,terlambat',
            'keterangan' => 'nullable|string',
        ];
    }
}
