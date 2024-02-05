<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\CategoryStatusEnum;
use App\Enums\CollectionStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Blogs\BlogUpdateRequest;
use App\Http\Requests\Catalog\Categories\CategoryRequest;
use App\Http\Resources\BlogResource;
use App\Http\Resources\CategoryResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Blog;
use App\Models\Category;
use App\Repositories\Eloquent\Catalog\BlogRepository;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\CollectionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{

    use UtilityTrait;

    protected $blogRepository;

    public function __construct(BlogRepository $blogRepository)
    {
        $this->blogRepository = $blogRepository;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "id";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "desc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        return Inertia::render('Admin/Blogs/All/Index', [
            'filters' => $filters,
            'blogs' => BlogResource::collection($this->blogRepository->filter($filters)),
            'blogStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ]);
    }
    public function create()
    {
        $blog = $this->blogRepository->findByColumn(['status' => CategoryStatusEnum::Draft->value]);
        // if (!$blog) {
            $blog = $this->blogRepository->create([
                'title' => "",
                'image' => "",
                'description' => "",
                'status' => CategoryStatusEnum::Draft->value
            ]);
        // }
        return Inertia::render('Admin/Blogs/Edit/Index', $this->formData($blog, "create"));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit/Index', $this->formData($blog, "edit"));
    }

    /**
     * Method formData
     *
     * @param Blog $blog
     * @param string $type
     *
     * @return void
     */
    protected function formData(Blog $blog, $type)
    {
        return [
            'blog' => $blog,
            'type' => $type,
            'blogStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ];
    }

    /**
     * .
     */
    public function updateBlog(BlogUpdateRequest $request, Blog $blog)
    {
        $data = $request->all();
        // dd($data);
        $blogRepository = app()->make(BlogRepository::class);
        if ($data['image'] == null) {
            unset($data['image']);
        } else {
            // $data['image'] = $data['image']->store('blogs', 'public');
        $image = $data['image']->store('blogs', 'public');
        $data['image'] = $image;
        }
        $blogRepository->update($blog->id, $data);
        return redirect(route('admin.blogs.index'))->with('success', 'Blog updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //delete faq
        $this->blogRepository->deleteById($blog->id);
        return redirect(route('admin.blogs.index'))->with('success', 'Blog deleted successfully');
    }
}
