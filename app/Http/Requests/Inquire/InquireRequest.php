<?php

namespace App\Http\Requests\Inquire;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class InquireRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"],
            "email" => ["required", "email", "max:255"],
            "phone" => ["nullable", "string", "max:255"],
            "message" => ["required", "string", "min:6"],
            "product_id" => ["nullable"],
        ];
    }
}
