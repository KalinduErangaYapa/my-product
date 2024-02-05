<?php

namespace App\Http\Requests\Bookings;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "customer_name" => ["required", "string", "max:255"],
            "email" => ["required", "email", "max:255, regex:/(.+)@(.+)\.(.+)/i"],
            //only numbers not limit and + allowed
            "phone_number" => ["required", "regex:/^[0-9\-\(\)\/\+\s]*$/", "max:255"],
            "message" => ["nullable", "string", "max:255"],
            "product_id" => ["nullable", "integer", "exists:products,id"],
            "device_id" => ["nullable", "integer", "exists:devices,id"],
            "price_id" => ["nullable", "integer", "exists:pricings,id"],
        ];
    }
}
