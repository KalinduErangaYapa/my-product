<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\BrothersTechSubscriber;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\BrothersTechSubscriberRepositoryInterface;


class BrothersTechSubscriberRepository extends BaseRepository implements BrothersTechSubscriberRepositoryInterface
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
    public function __construct(BrothersTechSubscriber $model)
    {
        $this->model = $model;
    }
}

