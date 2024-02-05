<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Pricing;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\PricingRepositoryInterface;

class PricingRepository extends BaseRepository implements PricingRepositoryInterface
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
    public function __construct(Pricing $model)
    {
        $this->model = $model;
    }
}
