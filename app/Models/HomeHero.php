<?php

namespace App\Models;

use App\Enums\HomeHeroStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class HomeHero extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'sub_title',
        'intro',
        'color',
        'link',
        'image',
        'mobile_image',
        'status',
    ];

    protected $casts = [
        'status' => HomeHeroStatusEnum::class,
    ];

    protected $appends = [
        'created_at_human',
        'image_url',
        'mobile_image_url'
    ];

    /**
     * Get Image Url Attribute
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        if ($image = $this->image) {
            return Storage::url($image);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->title ? "{$this->title}" : 'EN') . '&color=ffffff&background=ffb404&rounded=true&uppercase=false';
    }
    /**
     * Get Mobile Image Url Attribute
     *
     * @return string
     */
    public function getMobileImageUrlAttribute(): string
    {
        if ($mobileImage = $this->mobile_image) {
            return Storage::url($mobileImage);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->title ? "{$this->title}" : 'EN') . '&color=ffffff&background=ffb404&rounded=true&uppercase=false';
    }
    /**
     * Method getCreatedAtHumanAttribute
     *
     * @return string
     */
    public function getCreatedAtHumanAttribute(): string
    {
        return Carbon::parse($this->created_at)->format("M d, Y");
    }
    /**
     * @param mixed $query
     * @param mixed $column
     * @param string $direction
     *
     * @return [type]
     */
    public function scopeOrderByColumn($query, $column, $direction = 'asc')
    {
        $query->orderBy($column, $direction);
    }
    /**
     * @param mixed $query
     * @param array $filters
     *
     * @return [type]
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['searchParam'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
        // ->Where('status', "!=", "draft");
    }
}
