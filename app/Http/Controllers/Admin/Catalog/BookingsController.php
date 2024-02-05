<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Enums\BookingStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Http\Traits\UtilityTrait;
use App\Models\Booking;
use App\Repositories\Eloquent\Catalog\BookingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingsController extends Controller
{
    use UtilityTrait;

    protected $bookingRepository;

    /**
     * Method __construct
     *
     * @param BookingRepository $bookingRepository
     *
     * @return void
     */
    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //filters
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "customer_name";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "asc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 5;
        return Inertia::render(
            'Admin/Bookings/All/Index',
            [
                'filters' => $filters,
                'bookings' => BookingResource::collection($this->bookingRepository->filter($filters)),
                'bookingStatus' => $this->enumToSelect(BookingStatusEnum::cases()),
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $booking = $this->bookingRepository->findById($id, ["*"], ['product', 'device', 'pricing']);
        if (!($booking->status->value == BookingStatusEnum::Active->value)) {
            $this->bookingRepository->update($booking->id, [
                'status' => BookingStatusEnum::Active->value
            ]);
        }
        return Inertia::render('Admin/Bookings/Edit/Index', [
            'booking' => $booking,
            'type' => 'edit',
            'bookingStatus' => $this->enumToSelect(BookingStatusEnum::cases()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  Booking $booking)
    {
        $this->bookingRepository->update($booking->id, $request->all());
        return redirect(route('admin.bookings.index'))->with('success', 'Booking updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->bookingRepository->deleteById($id);
        return redirect(route('admin.bookings.index'))->with('success', 'Booking deleted successfully');
    }
}
