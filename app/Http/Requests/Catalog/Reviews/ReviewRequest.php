<?php

namespace App\Http\Requests\Catalog\Reviews;

use App\Enums\ReviewStatusEnum;
use App\Http\Traits\UtilityTrait;
use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"],
            "company" => ["nullable", "string", "max:255"],
            "rate" => ["nullable"],
            "product_id" => ["nullable"],
            "testimonial" => ["nullable", "string"],
            "image" => ["nullable"], //, "image", "mimes:jpeg,png,jpg,gif,svg", "max:2048"],
            "status" => ["required", "string", "in:" . implode(",", $this->enumToArray(ReviewStatusEnum::cases()))],
        ];
    }
}
