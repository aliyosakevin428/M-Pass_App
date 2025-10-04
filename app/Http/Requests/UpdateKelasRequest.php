<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'guru_id' => 'nullable|exists:gurus,id',
            'jurusan_id' => 'required|exists:jurusans,id',
        ];
    }
}
