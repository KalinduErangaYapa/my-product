<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InquiryResource extends JsonResource
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
            'subject' => $this->subject,
            'phone' => $this->phone,
            'email' => $this->email,
            'status' => $this->status,
            'type' => $this->type,
            'message' => $this->message,
            'type' => $this->type,
            'created_at' => $this->created_at_human,
        ];
    }
}
