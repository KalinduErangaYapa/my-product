<?php

namespace App\Services\Product;

use App\Enums\CategoryStatusEnum;
use App\Enums\DeviceStatusEnum;
use App\Enums\RepairTypeStatusEnum;
use App\Http\Traits\ImageUploadTrait;
use App\Repositories\Eloquent\Catalog\CategoryRepository;
use App\Repositories\Eloquent\Catalog\DeviceRepository;
use App\Repositories\Eloquent\Catalog\PricingRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use App\Repositories\Eloquent\Catalog\RepairTypeRepository;

class ProductService
{
    use ImageUploadTrait;
    /**
     * The repository interface to use in this service.
     */
    protected $productRepository;
    protected $repairTypeRepository;
    protected $deviceRepository;
    protected $pricingRepository;
    /**
     * Method __construct
     *
     * @param  ProductRepository  $productRepository [productRepository Repository]
     * @return void
     */
    public function __construct(
        ProductRepository $productRepository,
        RepairTypeRepository $repairTypeRepository,
        DeviceRepository $deviceRepository,
        PricingRepository $pricingRepository
    ) {
        $this->productRepository = $productRepository;
        $this->repairTypeRepository = $repairTypeRepository;
        $this->deviceRepository = $deviceRepository;
        $this->pricingRepository = $pricingRepository;
    }

    /**
     * Method getProduct
     *
     * @param $search $search [explicite description]
     *
     * @return void
     */
    public function getProduct($search)
    {
        if (isset($search['searchValue'])) {
            if (strlen($search['searchValue']) > 2) {
                $productRepository = app()->make(ProductRepository::class);
                $users = $productRepository->search(["*"], [], $search);
                if (count($users) > 0) {
                    return $users;
                }
            }
        }
        return [];
    }

    /**
     * Method getRepairTypes
     *
     * @param $product $product [explicite description]
     *
     * @return void
     */
    public function getRepairTypes($product)
    {
        $repairTypes = $this->repairTypeRepository->getByColumn(['status' => RepairTypeStatusEnum::Active->value]);
        $devices = $this->deviceRepository->getByColumn(['status' => DeviceStatusEnum::Active->value, 'product_id' => $product->id]);

        $array = [];

        foreach ($devices as $key => $device) {
            //
            $array[$key]['name'] = $device->name;
            $array[$key]['id'] = $device->id;
            //repair
            foreach ($repairTypes as $key2 => $repairType) {
                //
                $item = [
                    "repair_type_id" => $repairType->id,
                    "name" => $repairType->name,
                    "price" => null,
                    "status" => false,
                ];


                if ($price = $this->pricingRepository->findByColumn(['product_id' => $product->id, 'device_id' => $device->id, 'repair_type_id' => $repairType->id])) {
                    $item['price'] = $price->price;
                    $item['status'] = $price->status;
                }
                // repairs
                $array[$key]['repairs'][$key2] = $item;
            }
        }
        // dd($array);
        return $array;
    }

    /**
     * Method saveRepairTypes
     *
     * @param $id $id [explicite description]
     * @param $repairTypes $repairTypes [explicite description]
     *
     * @return void
     */
    public function saveRepairTypes($id, $repairTypes)
    {
        foreach ($repairTypes as $key => $device) {
            foreach ($device['repairs'] as $key => $repair) {

                if ($price = $this->pricingRepository->findByColumn(['product_id' => $id, 'device_id' => $device['id'], 'repair_type_id' => $repair['repair_type_id']])) {
                    //
                    $this->pricingRepository->update(
                        $price->id,
                        [
                            "price" => $repair['price'],
                            "status" => $repair['status'] ?? "inactive",
                        ]
                    );
                } else {
                    $this->pricingRepository->create(
                        [
                            "product_id" => $id,
                            "device_id" => $device['id'],
                            "repair_type_id" => $repair['repair_type_id'],
                            "price" => $repair['price'],
                            "status" => $repair['status'] ?? "inactive",
                        ]
                    );
                }
            }
        }
    }
    /**
     * Method getNonZeroRepairTypes
     *
     * @param $product $product [explicite description]
     *
     * @return void
     */
    public function getNonZeroRepairTypes($product)
    {
        $repairTypes = $this->repairTypeRepository->getByColumn(['status' => RepairTypeStatusEnum::Active->value]);
        $devices = $this->deviceRepository->getByColumn(['status' => DeviceStatusEnum::Active->value, 'product_id' => $product->id]);

        $array = [];
        $countI = 0;
        foreach ($devices as $key => $device) {
            //repair
            $itemsArray = [];
            $countJ = 0;
            foreach ($repairTypes as $key2 => $repairType) {
                //
                if ($price = $this->pricingRepository->findByColumn(['product_id' => $product->id, 'device_id' => $device->id, 'repair_type_id' => $repairType->id, 'status' => 'active'])) {
                    $item = [
                        "repair_type_id" => $repairType->id,
                        "name" => $repairType->name,
                        "price" => null,
                        "status" => false,
                    ];
                    $item['price'] = $price->price;
                    $item['status'] = $price->status;
                    // repairs
                    $itemsArray[$countJ] = $item;
                    ++$countJ;
                }
            }
            // check and save
            if (count($itemsArray) > 0) {
                //
                $array[$countI]['name'] = $device->name;
                $array[$countI]['id'] = $device->id;
                $array[$countI]['repairs'] = $itemsArray;
                ++$countI;
            }
        }
        return $array;
    }
}
