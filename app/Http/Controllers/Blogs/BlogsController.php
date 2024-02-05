<?php

namespace App\Http\Controllers\Blogs;

use App\Enums\CategoryStatusEnum;
use App\Http\Controllers\Controller;
use App\Repositories\Eloquent\Catalog\BlogRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogsController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
    {
        $blogsRepository = app()->make(BlogRepository::class);
        return Inertia::render('Blog/Index', [
            "blogs" => $blogsRepository->getByColumn(['status' => CategoryStatusEnum::Active->value]),
        ]);
    }

    /**
     * Method read
     *
     * @param int $blog [explicite description]
     *
     * @return Response
     */
    public function read(int $blog): Response
    {
        $blogsRepository = app()->make(BlogRepository::class);
        return Inertia::render(
            'Blog/View/Index',
            [
                "article" => $blogsRepository->findById($blog, ['*'], [])
            ]
        );
    }
}
