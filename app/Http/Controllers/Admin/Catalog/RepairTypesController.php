<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\RepairTypeStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\RepairTypeResource;
use App\Http\Traits\UtilityTrait;
use App\Models\RepairType;
use App\Repositories\Eloquent\Catalog\RepairTypeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepairTypesController extends Controller
{
    use UtilityTrait;

    protected $repairTypeRepository;

    /**
     * Method __construct
     *
     * @param RepairTypeRepository $repairTypeRepository
     *
     * @return void
     */
    public function __construct(RepairTypeRepository $repairTypeRepository)
    {
        $this->repairTypeRepository = $repairTypeRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "name";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "asc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 5;
        return Inertia::render(
            'Admin/RepairTypes/All/Index',
            [
                'filters' => $filters,
                'repairTypes' => RepairTypeResource::collection($this->repairTypeRepository->filter($filters)),
                'repairTypeStatus' => $this->enumToSelect(RepairTypeStatusEnum::cases()),

            ]
        );
    }

    public function create()
    {
        $repairType = $this->repairTypeRepository->create([
            'name' => '',
            'status' => RepairTypeStatusEnum::Draft->value
        ]);
        return Inertia::render('Admin/RepairTypes/Edit/Index', $this->formData($repairType, "create"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RepairType $repairType)
    {
        return Inertia::render('Admin/RepairTypes/Edit/Index', $this->formData($repairType, "edit"));
    }

    /**
     * Method formData
     *
     * @param RepairType $repairType
     * @param string $type
     *
     * @return void
     */
    protected function formData(RepairType $repairType, $type)
    {
        return [
            'repairType' => $repairType,
            'repairTypeStatus' => $this->enumToSelect(RepairTypeStatusEnum::cases()),
            'type' => $type,
        ];
    }

    public function updateRepairType(Request $request, RepairType $repairType)
    {

       $data = $request->all();
       $repairTypeRepository = app()->make(RepairTypeRepository::class);
         $repairTypeRepository->update($repairType->id, $data);
        return redirect(route('admin.repair-types.index'))->with('success', 'Repair Type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RepairType $repairType)
    {
        $repairType->delete();
        return redirect(route('admin.repair-types.index'))->with('success', 'Repair Type deleted successfully.');
    }
}
