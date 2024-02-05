<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Faq;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\FaqRepositoryInterface;

class FaqRepository extends BaseRepository implements FaqRepositoryInterface
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
    public function __construct(Faq $model)
    {
        $this->model = $model;
    }
}
