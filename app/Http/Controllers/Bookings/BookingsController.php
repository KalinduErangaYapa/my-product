<?php

namespace App\Http\Controllers\Bookings;

use App\Enums\DeviceStatusEnum;
use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Bookings\BookingRequest;
use App\Notifications\BookingNotification;
use App\Repositories\Eloquent\Catalog\BookingRepository;
use App\Repositories\Eloquent\Catalog\DeviceRepository;
use App\Repositories\Eloquent\Catalog\PricingRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class BookingsController extends Controller
{
    protected $services;
    protected $devices;
    protected $prices;
    protected $booking;

    public function __construct(ProductRepository $services, DeviceRepository $devices, PricingRepository $prices, BookingRepository $booking)
    {
        $this->services = $services;
        $this->devices = $devices;
        $this->prices = $prices;
        $this->booking = $booking;
    }
    /**
     * index
     *
     */
    public function index(Request $request)
    {
        $service = $request->service ?? null;
        $device = $request->device ?? null;
        $price = $request->price ?? null;

        // check is there service selected
        if ($service) {
            //check the service validity;
            $serviceObj = $this->services->findByColumn(['status' => ProductStatusEnum::Active->value, 'slug' => $service]);
            //check wheret service exists or not.
            if ($serviceObj) {
                // get respected devices for the service
                $devices = $this->devices->getByColumn(['status' => DeviceStatusEnum::Active->value, 'product_id' => $serviceObj->id]);
                // check whether device selected or not
                if ($device) {
                    // get selected device object if exists
                    $deviceObj = $this->devices->findByColumn(['status' => ProductStatusEnum::Active->value, 'id' => $device, 'product_id' => $serviceObj->id]);
                    //check whether device is exists or not
                    if ($deviceObj) {
                        $prices = $this->prices->getByColumn(
                            [
                                'status' => "active",
                                'product_id' => $serviceObj->id,
                                'device_id' => $deviceObj->id,
                            ],
                            ['*'],
                            ['repair']
                        );
                    }
                }
            }
        }

        $services = $this->services->getByColumn(['status' => ProductStatusEnum::Active->value]);
        return Inertia::render('Booking/Index', [
            "services" => $services,
            "service" => $service,
            "devices" => $devices ?? [],
            "device" => $device,
            'prices' => $prices ?? [],
            'price' => $price,
            "step" => $request->step ?? 1,
        ]);
    }

    /**
     * Method store
     *
     * @param Request $request [explicite description]
     *
     * @return void
     */
    public function store(BookingRequest $request)
    {
        // dd($request->all());
        $data = $request->all();
        $data['status'] = "active";
        $data['price_id'] = $request->price_id;
        $data['device_id'] = $request->device_id;
        $data['product_id'] = $request->service_id;
        $data['message'] = $request->message;
        $data['customer_name'] = $request->customer_name;
        $data['email'] = $request->email;
        $data['phone_number'] = $request->phone_number;
        $bookingRepository = app()->make(BookingRepository::class);
        $bookingRepository->create($data);

        Notification::send($bookingRepository->findByColumn(['status' => "active", 'email' => $request->email]), new BookingNotification($data));

        return redirect()->back()->with('success', 'Your booking has been submitted successfully.');

    }
}
