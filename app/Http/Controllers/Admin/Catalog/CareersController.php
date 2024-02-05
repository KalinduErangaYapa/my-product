<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\ContactUsReadEnum;
use App\Enums\InquiryStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Http\Resources\InquiryResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Career;
use App\Repositories\Eloquent\Catalog\CareersRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareersController extends Controller
{
    use UtilityTrait;

    protected $careersRepository;

    public function __construct(CareersRepository $careersRepository)
    {
        $this->careersRepository = $careersRepository;
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
        return Inertia::render('Admin/Careers/All/Index', [
            'filters' => $filters,
            'careers' => CareerResource::collection($this->careersRepository->filter($filters)),
            'careerStatus' => $this->enumToSelect(InquiryStatusEnum::cases()),
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id, Career $careers)
    {
        foreach ($careers->all() as $data) {
            if ($data['id'] == $id) {
                $careers = $data;
                $careerRepository = app()->make(CareersRepository::class);
                if ($careers['status']->value == ContactUsReadEnum::Unread->value) {
                    $careerRepository->update($careers->id, [
                        'status' => ContactUsReadEnum::Read->value
                    ]);
                }
                return Inertia::render('Admin/Careers/Edit/Index', [
                    'career' => $this->careersRepository->findByIdWithoutRelation($id),
                    'type' => 'edit',
                    // 'careerStatus' => $this->enumToSelect(InquiryStatusEnum::cases())
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->careersRepository->deleteById($id);
        return redirect(route('admin.careers.index'))->with('success', 'Career data deleted successfully');
    }
}
