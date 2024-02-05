<?php

namespace App\Http\Controllers\Home;

use App\Enums\HomeHeroStatusEnum;
use App\Enums\IsFeaturedEnum;
use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Repositories\Eloquent\Catalog\BlogRepository;
use App\Repositories\Eloquent\Catalog\CollectionRepository;
use App\Repositories\Eloquent\Catalog\HomeHeroRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function __invoke(): Response
    {

        $homeHeroRepository = app()->make(HomeHeroRepository::class);
        $productRepository = app()->make(ProductRepository::class);
        $blogRepository = app()->make(BlogRepository::class);

        return Inertia::render(
            'Home/Index',
            [
                "homeHero" => $homeHeroRepository->getByColumn(['status' => HomeHeroStatusEnum::Active->value]),
                "heroProducts" => $productRepository->getByColumn(['is_featured' => 'yes']),
                "blogs" => $blogRepository->getByColumn(['status' => 'active']),
                'featuredServices' => $productRepository->getByColumn(['status' => ProductStatusEnum::Active->value, 'is_featured' => IsFeaturedEnum::Yes->value], ["*"], ['prices']),
            ]
        );
    }
}
