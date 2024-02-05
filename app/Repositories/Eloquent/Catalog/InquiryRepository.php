<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Inquiry;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\InquiryRepositoryInterface;

class InquiryRepository extends BaseRepository implements InquiryRepositoryInterface
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
    public function __construct(Inquiry $model)
    {
        $this->model = $model;
    }
}
