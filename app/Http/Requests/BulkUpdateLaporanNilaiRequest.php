<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateLaporanNilaiRequest extends FormRequest
{
    /**
     * Determine if the laporanNilai is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'laporanNilai_ids' => 'required|array',
            'laporanNilai_ids.*' => 'exists:laporan_nilais,id',
        ];
    }
}
