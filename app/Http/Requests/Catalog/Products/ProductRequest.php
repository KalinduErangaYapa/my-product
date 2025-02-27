<?php

namespace App\Http\Requests\Catalog\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge(
            [
                'slug' => Str::slug($this->name),
            ]
        );
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
            "slug" => ["required", "string", "max:255"],
            "description" => ["nullable", "string"],
            "category_id" => ["nullable", "integer"],
            "brand_id" => ["nullable", "integer"],
            "icon" => ["nullable"],
        ];
    }
}
