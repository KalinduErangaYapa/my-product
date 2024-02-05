<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\HomeHero;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\HomeHeroRepositoryInterface;

class HomeHeroRepository extends BaseRepository implements HomeHeroRepositoryInterface
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
    public function __construct(HomeHero $model)
    {
        $this->model = $model;
    }
}
