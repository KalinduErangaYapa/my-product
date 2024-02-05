<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\ContactUs;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\ContactUsRepositoryInterface;

class ContactUsRepository extends BaseRepository implements ContactUsRepositoryInterface
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
    public function __construct(ContactUs $model)
    {
        $this->model = $model;
    }
}
