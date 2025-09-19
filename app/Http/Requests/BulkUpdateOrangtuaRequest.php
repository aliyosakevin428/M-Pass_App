<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateOrangtuaRequest extends FormRequest
{
    /**
     * Determine if the orangtua is authorized to make this request.
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
            'orangtua_ids' => 'required|array',
            'orangtua_ids.*' => 'exists:orangtuas,id',
        ];
    }
}
