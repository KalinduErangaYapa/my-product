<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CareerResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'cv' => $this->cv,
            'status' => $this->status,
            // 'type' => $this->type,
            // 'slug' => $this->slug,
            // 'message' => $this->message,
            // 'type_id' => $this->type_id,
            'created_at' => $this->created_at_human,
        ];
    }
}
