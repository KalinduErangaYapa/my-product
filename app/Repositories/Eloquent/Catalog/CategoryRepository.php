<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Category;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
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
    public function __construct(Category $model)
    {
        $this->model = $model;
    }
}
