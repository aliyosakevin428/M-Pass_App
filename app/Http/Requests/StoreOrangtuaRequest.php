<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrangtuaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'no_telpon' => 'required|string|max:255',
            'siswa_id' => 'nullable|exists:siswas,id',
        ];
    }
}
