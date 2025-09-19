<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSiswaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'jenis_kelamin' => 'required|string|max:255',
            'kelas_id' => 'nullable|exists:kelas,id',
            'email' => 'nullable|string|max:255',
            'no_telpon' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
        ];
    }
}
