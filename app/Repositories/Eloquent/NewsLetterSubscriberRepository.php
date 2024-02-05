<?php

namespace App\Repositories\Eloquent;

use App\Models\NewsLetterSubscriber;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\NewsLetterSubscriberRepositoryInterface;

class NewsLetterSubscriberRepository extends BaseRepository implements NewsLetterSubscriberRepositoryInterface
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
    public function __construct(NewsLetterSubscriber $model)
    {
        $this->model = $model;
    }
}
