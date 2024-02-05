<?php

namespace App\Http\Controllers\ProductsFilter;

use App\Enums\DeviceStatusEnum;
use App\Enums\RepairTypeStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Http\Traits\UtilityTrait;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\CollectionRepository;
use App\Repositories\Eloquent\Catalog\DeviceRepository;
use App\Repositories\Eloquent\Catalog\PricingRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use App\Repositories\Eloquent\Catalog\RepairTypeRepository;
use App\Services\Product\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * ProductsFilterController
 */
class ProductsFilterController extends Controller
{

    use UtilityTrait;

    protected $productRepository;
    protected $devicesRepository;
    protected $repairsRepository;
    protected $pricingRepository;
    protected $productService;

    /**
     * Method __construct
     *
     * @param ProductRepository $productRepository [explicite description]
     *
     * @return void
     */
    public function __construct(ProductRepository $productRepository, DeviceRepository $devicesRepository, RepairTypeRepository $repairsRepository, PricingRepository $pricingRepository, ProductService $productService)
    {
        $this->productRepository = $productRepository;
        $this->devicesRepository = $devicesRepository;
        $this->repairsRepository = $repairsRepository;
        $this->pricingRepository = $pricingRepository;
        $this->productService = $productService;
    }

    /**
     * Method show
     *
     *
     * @return void
     */
    public function index()
    {
        return Inertia::render(
            'Services/All/Index',
            [
                'services' => $this->productRepository->all(['*'], ['mainImage'])
            ]
        );
    }
    /**
     * Method show
     *
     * @param $slug $slug [explicite description]
     *
     * @return void
     */
    public function show(Request $request, String $slug)
    {
        $service = $this->productRepository->findByColumn(
            ["slug" => $slug],
            ["*"],
            [
                "images", 'category'
            ]
        );
        if (!$service) {
            abort(404);
        }
        $devices = $this->devicesRepository->getByColumn(['product_id' => $service->id, 'status' => DeviceStatusEnum::Active->value], ['id as value', 'name as label']);
        $repairTypes = $this->repairsRepository->getByColumn(['status' => RepairTypeStatusEnum::Active->value], ['id as value', 'name as label']);
        $activeDevice = $request->activeDevice ?? null;
        $activeRepair = $request->activeRepair ?? null;
        // $price = $this->pricingRepository->findByColumn(['product_id'=>$service->id,'device_id'=>$activeDevice, 'repair_type_id' => $activeRepair]);
        return Inertia::render(
            'Services/Show/Index',
            [
                'service' => $service,
                'devices' => $devices,
                'repairs' => $repairTypes,
                'activeDevice' => $activeDevice,
                'activeRepair' => $activeRepair,
                'prices' => $this->productService->getNonZeroRepairTypes($service)
            ]
        );
    }
}
