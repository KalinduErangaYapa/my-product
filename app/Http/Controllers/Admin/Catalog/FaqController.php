<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\CategoryStatusEnum;
use App\Enums\CollectionStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Categories\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\FaqResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Category;
use App\Models\Faq;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\FaqRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{

    use UtilityTrait;

    protected $faqRepository;

    public function __construct(FaqRepository $faqRepository)
    {
        $this->faqRepository = $faqRepository;
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
        return Inertia::render('Admin/FAQ/All/Index', [
            'filters' => $filters,
            'faqs' => FaqResource::collection($this->faqRepository->filter($filters)),
            'faqStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ]);
    }
    public function create()
    {
        // $faq = $this->faqRepository->findByColumn(['status' => CategoryStatusEnum::Draft->value]);
        $faq = $this->faqRepository->create([
            'question' => '',
            'answer' => "",
            'status' => CategoryStatusEnum::Draft->value
        ]);
        // if (!$faq) {
        // }
        return Inertia::render('Admin/FAQ/Edit/Index', $this->formData($faq, "create"));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/FAQ/Edit/Index', $this->formData($faq, "edit"));
    }

    /**
     * Method formData
     *
     * @param Faq $faq
     * @param string $type
     *
     * @return void
     */
    protected function formData(Faq $faq, $type)
    {
        return [
            'faq' => $faq,
            'type' => $type,
            'parentFaqs' => $this->faqRepository->getByColumn(['status' => CategoryStatusEnum::Active->value], ['id as value', 'question as label']),
            'faqStatus' => $this->enumToSelect(CategoryStatusEnum::cases()),
        ];
    }

    /**
     * .
     */
    public function updateFaq(Request $request, Faq $faq)
    {
        $data = $request->all();
        $faqRepository = app()->make(FaqRepository::class);
        $faqRepository->update($faq->id, $data);
        return redirect(route('admin.faq.index'))->with('success', 'Faq updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq)
    {
        //delete faq
        $this->faqRepository->deleteById($faq->id);
        return redirect(route('admin.faq.index'))->with('success', 'Faq deleted successfully');
    }
}
