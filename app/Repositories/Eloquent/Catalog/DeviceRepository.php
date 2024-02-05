<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Device;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\DeviceRepositoryInterface;

class DeviceRepository extends BaseRepository implements DeviceRepositoryInterface
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
    public function __construct(Device $model)
    {
        $this->model = $model;
    }
}
