<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Blog;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\BlogRepositoryInterface;

class BlogRepository extends BaseRepository implements BlogRepositoryInterface
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
    public function __construct(Blog $model)
    {
        $this->model = $model;
    }
}
