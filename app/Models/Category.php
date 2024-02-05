<?php

namespace App\Models;

use App\Enums\CategoryStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'status',
        'parent_id',
    ];

    protected $casts = [
        'status' => CategoryStatusEnum::class,
    ];

    protected $appends = [
        'created_at_human',
        'image_url',
    ];

    /**
     * getImageUrlAttribute
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        return Storage::url($this->image);
    }
    /**
     * Method parent
     *
     * @return void
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
    /**
     * Method children
     *
     * @return void
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


    /**
     * Method products
     *
     * @return void
     */
    public function products()
    {
        return $this->hasMany(Product::class);
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
