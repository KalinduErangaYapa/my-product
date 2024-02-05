<?php

namespace App\Models;

use App\Enums\ProductImageStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'image', 'status'];

    protected $casts = [
        'status' => ProductImageStatusEnum::class
    ];

    protected $appends = [
        'url'
    ];


    public static function boot()
    {
        parent::boot();
        static::deleting(function ($image) {
            Storage::disk('public')->delete($image->image);
        });
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->image);
    }
}
