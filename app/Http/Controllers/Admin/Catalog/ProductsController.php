<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\IsFeaturedEnum;
use App\Enums\ProductImageStatusEnum;
use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\Products\ProductRequest;
use App\Http\Resources\ProductTableResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Device;
use App\Models\Product;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\DeviceRepository;
use App\Repositories\Eloquent\Catalog\PricingRepository;
use App\Repositories\Eloquent\Catalog\ProductImageRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use App\Repositories\Eloquent\Catalog\RepairTypeRepository;
use App\Repositories\Eloquent\Catalog\ServiceIconRepository;
use App\Services\Product\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{

    use UtilityTrait;

    protected $productRepository;
    protected $categoryRepository;
    protected $brandRepository;
    protected $collectionRepository;
    protected $attributeRepository;
    protected $deviceRepository;
    protected $repairTypeRepository;
    protected $pricingRepository;
    protected $productService;

    /**
     * Method __construct
     *
     * @param ProductRepository $productRepository
     * @param CategoryRepository $categoryRepository
     *
     *
     * @return void
     */
    public function __construct(ProductRepository $productRepository, CategoryRepository $categoryRepository, DeviceRepository $deviceRepository, RepairTypeRepository $repairTypeRepository, PricingRepository $pricingRepository, ProductService $productService)
    {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
        $this->deviceRepository = $deviceRepository;
        $this->repairTypeRepository = $repairTypeRepository;
        $this->pricingRepository = $pricingRepository;
        $this->productService = $productService;
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
            'Admin/Products/All/Index',
            [
                'filters' => $filters,
                'products' => ProductTableResource::collection($this->productRepository->filter($filters, ['category', 'mainImage'])),
                'productStatus' => $this->enumToSelect(ProductStatusEnum::cases()),

            ]
        );
    }
    /**
     * Method create
     *
     * @return void
     */
    public function create()
    {
        $product = $this->productRepository->findByColumn(['status' => ProductStatusEnum::Draft->value], ['*'], ['images'], ['devices'], ['repairTypes']);
        if (!$product) {
            $product = $this->productRepository->create(
                [
                    'name' => '',
                    'slug' => 'draft',
                    'status' => ProductStatusEnum::Draft->value
                ]
            );
        }
        return Inertia::render('Admin/Products/Edit/Index', $this->formData($product, "create"));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $product = $this->productRepository->findByColumn(['id' => $id], ['*'], ['images'], ['devices'], ['repairTypes']);
        return Inertia::render('Admin/Products/Edit/Index', $this->formData($product, "edit"));
    }

    /**
     * Method formData
     *
     * @param Product $product
     * @param string $type
     *
     * @return array
     */
    protected function formData(Product $product, $type)
    {
        return [
            'product' => $product,
            'featuredData' => $this->enumToSelect(IsFeaturedEnum::cases()),
            // 'categories' => $this->categoryRepository->getByColumn(['status' => CategoryStatusEnum::Active->value], ['id as value', 'name as label']),
            'type' => $type,
            'productStatus' => $this->enumToSelect(ProductStatusEnum::cases()),
            'repairTypes' => $this->productService->getRepairTypes($product)
        ];
    }


    /**
     * Update the specified resource in storage.
     */
    public function updateProduct(ProductRequest $request, int $id)
    {
        $this->productRepository->update($id, $request->all());
        $data = $request->all();
        $productRepository = app()->make(ProductRepository::class);
        if ($data['icon'] == null || is_string($data['icon'])) {
            unset($data['icon']);
        } else {
            $data['icon'] = $data['icon']->store('product', 'public');
        }
        $productRepository->update($id, $data);
        // update product service
        if (array_key_exists('repairTypes', $data)) {
            $this->productService->saveRepairTypes($id, $data['repairTypes']);
        }
        return redirect(route('admin.services.index', $id))->with('success', 'Service saved successfully');
    }



    /**
     * Method uploadImage
     *
     * @param Request $request [explicite description]
     * @param Product $product [explicite description]
     *
     * @return void
     */
    public function uploadImage(Request $request, Product $product)
    {
        // dd($request->all());
        $productImageRepository = app()->make(ProductImageRepository::class);
        $data = $request->all();
        foreach ($data['images'] as $key => $image) {
            $path = $image->store('products', 'public');
            // check main
            $status = ProductImageStatusEnum::Normal->value;
            if ($product->main_image == null) {
                $status = ProductImageStatusEnum::Main->value;
            }
            $productImageRepository->create(
                [
                    'product_id' => $product->id,
                    'image' => $path,
                    'status' => $status
                ]
            );
        }
    }

    /**
     * Method deleteImage
     *
     * @param Request $request [explicite description]
     * @param Int $productImageId [explicite description]
     *
     * @return void
     */
    public function deleteImage(Request $request, Int $id)
    {

        $productImageRepository = app()->make(ProductImageRepository::class);
        $productImageRepository->deleteById($id);
    }


    /**
     * Method deleteIcon
     *
     * @param Request $request [explicite description]
     * @param Int $id [explicite description]
     *
     * @return void
     */
    public function deleteIcon(Request $request, Int $id)
    {
        $serviceIconRepository = app()->make(ServiceIconRepository::class);
        $serviceIconRepository->deleteById($id);
    }
    /**
     * destroy
     *
     * @param  mixed $product
     * @param  mixed $id
     * @return void
     */
    public function destroy(Product $product, int $id)
    {

        //delete product
        $this->productRepository->deleteById($id);
        return redirect(route('admin.services.index'))->with('success', 'Product deleted successfully');
    }
    /**
     * createDevice
     *
     * @param  mixed $product
     * @param  mixed $request
     * @return void
     */
    public function createDevice(Product $product, Request $request)
    {
        // dd($request->all());
        $deviceRepository = app()->make(DeviceRepository::class);
        $data = $request->all();
        $device = $deviceRepository->create(
            [

                'product_id' => $product->id,
                'name' => $data['name'],
                'status' => $data['status'],
            ]
        );
        return redirect(route('admin.services.edit', $product->id))->with('success', 'Device created successfully');
    }
    /**
     * updateDevice
     *
     * @param  mixed $product
     * @param  mixed $request
     * @return void
     */
    public function updateDevice(Product $product, Request $request)
    {
        // dd($request->all());
        $deviceRepository = app()->make(DeviceRepository::class);
        $data = $request->all();
        $device = $deviceRepository->update(
            [
                'product_id' => $product->id,
                'name' => $data['name'],
                'status' => $data['status'],
            ]
        );
        return redirect(route('admin.services.edit', $product->id))->with('success', 'Device updated successfully');
    }

    /**
     * deleteDevice
     *
     * @param  mixed $product
     * @param  mixed $request
     * @param  mixed $device
     * @return void
     */
    public function deleteDevice(Product $product, Request $request, Device $device)
    {
        // dd($request->all());
        $deviceRepository = app()->make(DeviceRepository::class);
        $data = $request->all();
        $device = $deviceRepository->deleteById($device->id);
        return redirect(route('admin.services.edit', $product->id))->with('success', 'Device deleted successfully');
    }
}
