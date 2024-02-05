<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'company' => $this->company,
            'product' => $this->product,
            'status' => $this->status,
            'rate' => $this->rate,
            'testimonial' => $this->testimonial,
            'image' => $this->image_url,
            'created_at' => $this->created_at_human,
        ];
    }
}
