<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ServiceIcon extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'icon', 'status'];

    protected $appends = [
        'url'
    ];

    // boot function
    /**
     * Method boot
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        parent::boot();
        static::deleting(function ($icon) {
            Storage::disk('public')->delete($icon->image);
        });
    }

    public function getUrlAttribute()
    {
        return Storage::url($this->icon);
    }


}
