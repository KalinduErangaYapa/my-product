<?php

namespace App\Http\Requests\Catalog\Inquiries;

use App\Enums\InquiryStatusEnum;
use App\Enums\InquiryTypeEnum;
use App\Http\Traits\UtilityTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class InquiryRequest extends FormRequest
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
            "slug" => ["required", "string", "max:255", "unique:inquiries,slug," . $this->inquiry->id],
            "phone" => ["nullable", "string"],
            "subject" => ["nullable", "string", "max:255"],
            "email" => ["nullable", "email", "max:255"],
            "message" => ["nullable", "string"],
            "type_id" => ["nullable"],
            "status" => ["required", "string", "in:" . implode(",", $this->enumToArray(InquiryStatusEnum::cases()))],
            "type" => ["required", "string", "in:" . implode(",", $this->enumToArray(InquiryTypeEnum::cases()))],
        ];
    }
}
