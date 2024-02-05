<?php

namespace App\Http\Requests\Catalog\HomeHeros;

use App\Enums\HomeHeroStatusEnum;
use App\Http\Traits\UtilityTrait;
use Illuminate\Foundation\Http\FormRequest;

class HomeHeroRequest extends FormRequest
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
            "intro" => ["nullable", "string"],
            "link" => ["nullable", "string", "max:255"],
            "image" => ["required"],
            "status" => ["required", "string", "in:" . implode(",", $this->enumToArray(HomeHeroStatusEnum::cases()))],
        ];
    }
}
