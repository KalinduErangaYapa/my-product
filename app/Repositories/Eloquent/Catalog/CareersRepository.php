<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Career;
use App\Models\Careers;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\CareersRepositoryInterface;

class CareersRepository extends BaseRepository implements CareersRepositoryInterface
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
    public function __construct(Career $model)
    {
        $this->model = $model;
    }
}
