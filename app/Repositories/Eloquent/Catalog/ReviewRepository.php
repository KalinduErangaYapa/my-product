<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Review;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\ReviewRepositoryInterface;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
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
    public function __construct(Review $model)
    {
        $this->model = $model;
    }
}
