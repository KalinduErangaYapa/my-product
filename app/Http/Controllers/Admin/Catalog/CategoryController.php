<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\CategoryStatusEnum;
use App\Enums\CollectionStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Categories\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Category;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\CollectionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    use UtilityTrait;

    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
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
        return Inertia::render('Admin/Categories/All/Index', [
            'filters' => $filters,
            'categories' => CategoryResource::collection($this->categoryRepository->filter($filters, ['parent'])),
            'categoryStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ]);
    }
    public function create()
    {
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit/Index', $this->formData($category, "edit"));
    }

    /**
     * Method formData
     *
     * @param Category $category
     * @param string $type
     *
     * @return void
     */
    protected function formData(Category $category, $type)
    {
        return [
            'category' => $category,
            'type' => 'edit',
            'parentCategories' => $this->categoryRepository->getByColumn(['status' => CategoryStatusEnum::Active->value], ['id as value', 'name as label']),
            'categoryStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ];
    }

    /**
     * .
     */
    public function updateCategory(CategoryRequest $request, Category $category)
    {
        $data = $request->all();
        $categoryRepository = app()->make(CategoryRepository::class);
        if ($data['image'] == null) {
            unset($data['image']);
        } else {
            $data['image'] = $data['image']->store('category', 'public');
        }
        $categoryRepository->update($category->id, $data);
        return redirect(route('admin.categories.index'))->with('success', 'Category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->categoryRepository->deleteById($id);
        return redirect(route('admin.categories.index'))->with('success', 'Category deleted successfully');
    }
}
