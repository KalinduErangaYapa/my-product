<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\RepairType;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\RepairTypeRepositoryInterface;

class RepairTypeRepository extends BaseRepository implements RepairTypeRepositoryInterface
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
    public function __construct(RepairType $model)
    {
        $this->model = $model;
    }
}
