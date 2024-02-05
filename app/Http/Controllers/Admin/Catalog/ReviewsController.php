<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\ReviewStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Reviews\ReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Review;
use App\Repositories\Eloquent\Catalog\ReviewRepository;
use App\Services\ProductServices\ProductParameterService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    use UtilityTrait;

    protected $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
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
        return Inertia::render('Admin/Reviews/All/Index', [
            'filters' => $filters,
            'reviews' => ReviewResource::collection($this->reviewRepository->filter($filters)),
            'reviewStatus' => $this->enumToSelect(ReviewStatusEnum::cases())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $review = $this->reviewRepository->findByColumn(['status' => ReviewStatusEnum::Draft->value]);
        if (!$review) {
            $review = $this->reviewRepository->create([
                'name' => 'new review customer',
                'status' => ReviewStatusEnum::Draft->value
            ]);
        }
        // dd(app()->make(ProductRepository::class)->all(['id', 'name']));
        return Inertia::render('Admin/Reviews/Edit/Index', [
            'review' => $review,
            'type' => 'create',
            'reviewStatus' => $this->enumToSelect(ReviewStatusEnum::cases()),
            'products' => app()->make(ProductParameterService::class)->getProducts()
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review = null)
    {
        return Inertia::render('Admin/Reviews/Edit/Index', [
            'review' => $review,
            'type' => 'edit',
            'reviewStatus' => $this->enumToSelect(ReviewStatusEnum::cases()),
            'products' => app()->make(ProductParameterService::class)->getProducts()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
    /**
     * updateReview
     *
     * @param  mixed $request
     * @param  mixed $review
     * @return void
     */
    public function updateReview(ReviewRequest $request, Review $review)
    {
        // dd($request->all());
        $data = $request->all();
        $reviewRepository = app()->make(ReviewRepository::class);
        if ($data['image'] == null ||  is_string($data['image'])) {
            unset($data['image']);
        } else {
            $data['image'] = $data['image']->store('review', 'public');
        }
        $reviewRepository->update($review->id, $data);
        return redirect(route('admin.reviews.index'))->with('success', 'Review updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
