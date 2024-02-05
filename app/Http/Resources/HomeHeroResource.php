<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeHeroResource extends JsonResource
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
            'title' => $this->title,
            'sub_title' => $this->sub_title,
            'intro' => $this->intro,
            'color' => $this->color,
            'link' => $this->link,
            'image' => $this->image_url,
            'mobile_image' => $this->mobile_image_url,
            'status' => $this->status,
            'created_at' => $this->created_at_human,

        ];
    }
}
