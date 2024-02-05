<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\ServiceIcon;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\ServiceIconRepositoryInterface;

class ServiceIconRepository extends BaseRepository implements ServiceIconRepositoryInterface
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
    public function __construct(ServiceIcon $model)
    {
        $this->model = $model;
    }
}
