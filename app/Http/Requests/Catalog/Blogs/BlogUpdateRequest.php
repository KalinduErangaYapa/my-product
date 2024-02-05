<?php

namespace App\Http\Requests\Catalog\Blogs;

use App\Enums\CategoryStatusEnum;
use App\Http\Traits\UtilityTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class BlogUpdateRequest extends FormRequest
{
    use UtilityTrait;
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
            "title" => ["required", "string", "max:255"],
            "description" => ["required", "string"],
            "image" => ["nullable"],
            "status" => ["required", "string", "in:" . implode(",", $this->enumToArray(CategoryStatusEnum::cases()))],
        ];
    }
}
