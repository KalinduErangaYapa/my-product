<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status','product_id'];

    protected $appends = [
        'created_at_human',
        'updated_at_human',
    ];

    protected $with = [
        'pricing',
    ];

    public function pricing()
    {
        return $this->hasMany(Pricing::class);
    }
    
    public function getCreatedAtHumanAttribute(): string
    {
        return Carbon::parse($this->created_at)->format("M d, Y - h:i a");
    }

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
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%');
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        })->when($filters['categories'] ?? "", function ($query, $categories) {
            $query->whereHas('category', function ($query) use ($categories) {
                $query->whereIn('slug', explode(",", $categories));
            });
        })->Where('status', "!=", "draft");
    }
}
