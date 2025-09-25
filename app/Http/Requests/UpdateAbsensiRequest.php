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
            'siswa_id' => 'nullable',
            'kelas_id' => 'nullable',
            'tanggal' => 'nullable',
            'status' => 'nullable',
            'keterangan' => 'nullable',
        ];
    }
}
