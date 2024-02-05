<?php

namespace App\Services;

use App\Enums\CollectionStatusEnum;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\CollectionRepository;

class UtilityService
{


    public function index()
    {
        return [
            "currency" => config('app.currency'),
            "categories" => $this->getNavCategoryCollection()
        ];
    }

    public function getNavCategoryCollection()
    {
        $array = session()->get('nav-category-collection');
        if (!$array) {
            $categories = app()->make(CategoryRepository::class)->getByColumn(['status' => 'active']);
            foreach ($categories as $key => $category) {
                $array[$key]['name'] = $category->name;
                $array[$key]['slug'] = $category->slug;
                $array[$key]['image'] = $category->image_url;
            }

            session()->put('nav-category-collection', $array);
        }
        return $array;
    }
}
