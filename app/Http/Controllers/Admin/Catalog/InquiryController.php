<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\InquiryStatusEnum;
use App\Enums\InquiryTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Inquiries\InquiryRequest;
use App\Http\Resources\InquiryResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Brand;
use App\Models\Inquiry;
use App\Repositories\Eloquent\Catalog\InquiryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    use UtilityTrait;

    protected $inquiryRepository;

    public function __construct(InquiryRepository $inquiryRepository)
    {
        $this->inquiryRepository = $inquiryRepository;
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
        return Inertia::render('Admin/Inquiries/All/Index', [
            'filters' => $filters,
            'inquiries' => InquiryResource::collection($this->inquiryRepository->filter($filters)),
            'inquiryStatus' => $this->enumToSelect(InquiryStatusEnum::cases()),
            'inquiryTypes' => $this->enumToSelect(InquiryTypeEnum::cases())
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $inqData = $this->inquiryRepository->findById($id, ["*"], ['product']);
        if (!($inqData['status']->value == InquiryStatusEnum::Read->value)) {
            $this->inquiryRepository->update($inqData->id, [
                'status' => InquiryStatusEnum::Read->value
            ]);
        }
        return Inertia::render('Admin/Inquiries/Edit/Index', [
            'inquiry' => $inqData,
            'type' => 'edit',
            'inquiryTypes' => $this->enumToSelect(InquiryTypeEnum::cases()),
            'inquiryStatus' => $this->enumToSelect(InquiryStatusEnum::cases())
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inquiry $inquiry)
    {
        $this->inquiryRepository->update($inquiry->id, $request->all());
        return redirect(route('admin.inquiries.index'))->with('success', 'Inquiry updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->inquiryRepository->deleteById($id);
        return redirect(route('admin.inquiries.index'))->with('success', 'Inquiry deleted successfully');
    }
}
