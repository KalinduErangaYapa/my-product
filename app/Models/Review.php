<?php

namespace App\Models;

use App\Enums\ReviewStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company',
        'product_id',
        'rate',
        'testimonial',
        'image',
        'status',
    ];

    protected $casts = [
        'status' => ReviewStatusEnum::class,
    ];

    protected $appends = [
        'created_at_human',
        'image_url',
    ];
    protected $with = [
        'product'
    ];

    /**
     * Method product
     *
     * @return void
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
    /**
     * getImageUrlAttribute
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        return Storage::disk('public')->url($this->image);
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
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        })->Where('status', "!=", "draft");
    }
}
