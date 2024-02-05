<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\ContactUsReadEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactUsResource;
use App\Http\Traits\UtilityTrait;
use App\Models\ContactUs;
use App\Repositories\Eloquent\Catalog\ContactUsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactUsController extends Controller
{

    use UtilityTrait;

    protected $contactUsRepository;

    public function __construct(ContactUsRepository $contactUsRepository)
    {
        $this->contactUsRepository = $contactUsRepository;
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
        return Inertia::render('Admin/ContactUs/All/Index', [
            'filters' => $filters,
            'contactUs' => ContactUsResource::collection($this->contactUsRepository->filter($filters)),
            'contactStatus' => $this->enumToSelect(ContactUsReadEnum::cases()),
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id, ContactUs $contactUs)
    {
        foreach($contactUs->all() as $data){
            if($data['id'] == $id){
                $contactUs = $data;
                $contactUsRepository = app()->make(ContactUsRepository::class);
                if($contactUs['status']->value == ContactUsReadEnum::Unread->value){
                    $contactUsRepository->update($contactUs->id, [
                        'status' => ContactUsReadEnum::Read->value
                    ]);
                }
                return Inertia::render('Admin/ContactUs/Edit/Index', $this->formData($contactUs, "edit"));
            }
        }
    }

    /**
     * Method formData
     *
     * @param ContactUs $contactUs
     * @param string $type
     *
     * @return void
     */
    protected function formData(ContactUs $contactUs, $type)
    {
        return [
            'contactUs' => $contactUs,
            'type' => $type,
            'contactStatus' => $this->enumToSelect(ContactUsReadEnum::cases()),
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //delete faq
        $this->contactUsRepository->deleteById($id);
        return redirect(route('admin.contact-us.index'))->with('success', 'Contact data deleted successfully');
    }
}
