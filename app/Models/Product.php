<?php

namespace App\Models;

use App\Enums\IsFeaturedEnum;
use App\Enums\ProductStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'introduction',
        'slug',
        'category_id',
        'introduction',
        'description',
        'image',
        'page_title',
        'icon',
        'status',
        'is_featured',
    ];



    protected $casts = [
        'status' => ProductStatusEnum::class,
        'is_featured' => IsFeaturedEnum::class,
    ];

    protected $appends = [
        'created_at_human',
        'updated_at_human',
        'icon_url',
    ];

    protected $with = [
        'mainImage',
        'devices',
        'pricing',
    ];



    public function getIconUrlAttribute(): string
    {
        return Storage::url($this->icon);
    }


    // boot function
    /**
     * Method boot
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(
            function ($product) {
                $product->slug = Str::slug($product->slug);
            }
        );
    }


    /**
     * Method images
     *
     * @return void
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Method pricing
     *
     * @return void
     */
    public function pricing()
    {
        return $this->hasMany(Pricing::class);
    }

    /**
     * Method prices
     *
     * @return void
     */
    public function prices()
    {
        return $this->hasMany(Pricing::class, 'product_id')->orderBy('price', 'desc')->where('status', 'active');
    }


    /**
     * reviews
     *
     * @return void
     */
    public function reviews()
    {
        return $this->hasMany(Review::class)->where('status', 'active')->orderBy('created_at', 'desc');
    }

    /**
     * Method mainImage
     *
     * @return void
     */
    public function mainImage()
    {
        return $this->hasOne(ProductImage::class)->where('status', 'main');
    }



    public function mainIcon()
    {
        return $this->hasOne(ServiceIcon::class)->where('status', 'main');
    }


    /**
     * Method Category
     *
     * @return void
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
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

    public function devices()
    {
        return $this->hasMany(Device::class)->where('status', 'active');
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
