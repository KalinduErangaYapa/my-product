<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsLetterSubscriber extends Model
{
    use HasFactory;


    protected $fillable = [
        'email', 'status'
    ];

    protected $appends = [
        'created_at_human',
    ];

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
                $query->where('email', 'like', '%' . $search . '%')
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
