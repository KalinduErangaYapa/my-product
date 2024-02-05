<?php

namespace App\Repositories\Eloquent\Catalog;

use App\Models\Product;
use App\Repositories\Base\BaseRepository;
use App\Repositories\Interfaces\Catalog\ProductRepositoryInterface;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
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
    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function search(array $columns = ['*'], array $relations, array $filters)
    {
        if (isset($filters['type'])) {
            $query = $this->model->select($columns)->onlyTrashed();
        } else {
            $query = $this->model->select($columns);
        }
        //relations
        if (count($relations)) {
            $query =  $query->with($relations);
        }
        //filters
        if (isset($filters['searchValue'])) {
            $query = $query->where(function ($query) use ($filters) {
                $query->where('name', 'like', '%' . $filters['searchValue'] . '%')
                    ->orWhere('id', 'like', '%' . $filters['searchValue'] . '%');
            });
        }
        // role
        if (isset($filters['role'])) {
            $query =  $query->whereIn('role', $filters['role']);
        }
        if (isset($filters['perPage'], $filters['page'])) {
            return $query->paginate($filters['perPage'], $filters['page']);
        }
        return $query->paginate();
    }

}
