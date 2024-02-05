<?php

namespace App\Http\Requests\Careers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class CareersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "first_name" => ["required", "string", "max:255"],
            "last_name" => ["required","max:255"],
            "email" => ["required", "email", "max:255, regex:/(.+)@(.+)\.(.+)/i"],
            "phone" => ["required", "string", "max:50"],
            "cv" => ["required", "max:8192"],
        ];
    }
}
