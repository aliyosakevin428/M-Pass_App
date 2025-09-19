<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKelasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'guru_id' => 'nullable|exists:gurus,id',
            'jurusan_id' => 'nullable|exists:jurusans,id',
        ];
    }
}
