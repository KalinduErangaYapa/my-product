<?php

namespace App\Models;

use App\Enums\CategoryStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'image'
    ];

    protected $casts = [
        'status' => CategoryStatusEnum::class,
    ];

    protected $appends = [
        'created_at_human',
        'updated_at_human',
        'image_url'
    ];
    /**
     * getImageUrlAttribute
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        // return Storage::url($this->image);
        if ($image = $this->image) {
            // return Storage::url($image);
            return Storage::url($image);
        }
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->title ? "{$this->title}" : 'Blog') . '&color=ffffff&background=ffb404&rounded=true&uppercase=false';
    }
    /**
     * Method getCreatedAtHumanAttribute
     *
     * @return string
     */
    public function getCreatedAtHumanAttribute(): string
    {
        return Carbon::parse($this->created_at)->format("M d, Y - h:i a");
    }

    /**
     * Method getUpdatedAtHumanAttribute
     *
     * @return string
     */
    public function getUpdatedAtHumanAttribute(): string
    {
        return Carbon::parse($this->updated_at)->format("M d, Y - h:i a");
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
