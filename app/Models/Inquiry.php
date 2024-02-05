<?php

namespace App\Models;

use App\Enums\InquiryStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'subject',
        'phone',
        'email',
        'message',
        'status',
        'type',
        'slug',
        'product_id'
    ];

    protected $casts = [
        'status' => InquiryStatusEnum::class,
    ];

    protected $appends = [
        'created_at_human'
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
