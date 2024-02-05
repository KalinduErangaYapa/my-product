<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Booking;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\BookingRepositoryInterface;

class BookingRepository extends BaseRepository implements BookingRepositoryInterface
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
    public function __construct(Booking $model)
    {
        $this->model = $model;
    }
}
