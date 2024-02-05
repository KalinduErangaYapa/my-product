<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\ProductImage;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\ProductImageRepositoryInterface;

class ProductImageRepository extends BaseRepository implements ProductImageRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Model  $model
     */
    public function __construct(ProductImage $model)
    {
        $this->model = $model;
    }
}
