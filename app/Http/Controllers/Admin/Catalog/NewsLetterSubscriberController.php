<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\NewsLetterSubscriberStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\NewsLetterSubscriberResource;
use App\Http\Traits\UtilityTrait;
use App\Models\NewsLetterSubscriber;
use App\Repositories\Eloquent\NewsLetterSubscriberRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsLetterSubscriberController extends Controller
{
    use UtilityTrait;

    protected $newsLetterSubscriberRepository;

    public function __construct(NewsLetterSubscriberRepository $newsLetterSubscriberRepository)
    {
        $this->newsLetterSubscriberRepository=$newsLetterSubscriberRepository;
    }

    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "email";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "asc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 5;
        return Inertia::render(
            'Admin/NewsLetterSubscribers/All/Index',
            [
                'filters' => $filters,
                'newsLetterSubscribers' => NewsLetterSubscriberResource::collection($this->newsLetterSubscriberRepository->filter($filters)),
                'newsLetterSubscriberStatus' => $this->enumToSelect(NewsLetterSubscriberStatusEnum::cases()),
            ]
        );
    }

    public function edit(int $id)
    {
        $newsLetterSubscriber = $this->newsLetterSubscriberRepository->findById($id);

        return Inertia::render( 'Admin/NewsLetterSubscribers/Edit/Index', [
            'newsLetterSubscriber' => $newsLetterSubscriber,
            'newsLetterSubscriberStatus' => $this->enumToSelect(NewsLetterSubscriberStatusEnum::cases()),
        ]);
    }

    public function update(Request $request, int $id)
    {
        $this-> newsLetterSubscriberRepository->update($id, $request->all());
        return redirect(route('admin.news-letter-subscribers.index'))->with('success', 'NewsLetterSubscriber updated successfully.');
    }

    public function destroy(int $id)
    {
        $this->newsLetterSubscriberRepository->deleteById($id);
        return redirect()->back()->with('success', 'NewsLetterSubscriber deleted successfully.');
    }


}
