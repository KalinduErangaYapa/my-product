<?php

namespace App\Repositories\Eloquent;

use App\Models\Order;
use App\Models\User;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\OrderRepositoryInterface;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
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
    public function __construct(Order $model)
    {
        $this->model = $model;
    }


}
