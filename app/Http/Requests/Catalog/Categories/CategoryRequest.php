<?php

namespace App\Http\Requests\Catalog\Categories;

use App\Enums\CategoryStatusEnum;
use App\Http\Traits\UtilityTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class CategoryRequest extends FormRequest
{
    use UtilityTrait;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    protected function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->slug),
        ]);
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
            "slug" => ["required", "string", "max:255", "unique:categories,slug," . $this->category->id],
            "description" => ["nullable", "string", "max:255"],
            "image" => ["nullable"],
            "parent_id" => ["nullable", "integer", "exists:categories,id"],
            "status" => ["required", "string", "in:" . implode(",", $this->enumToArray(CategoryStatusEnum::cases()))],
        ];
    }
}
