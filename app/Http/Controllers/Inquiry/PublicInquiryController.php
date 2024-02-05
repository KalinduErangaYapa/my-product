<?php

namespace App\Http\Controllers\Inquiry;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inquire\InquireRequest;
use App\Http\Traits\UtilityTrait;
use App\Repositories\Eloquent\Catalog\InquiryRepository;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicInquiryController extends Controller
{

    use UtilityTrait;

    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index()
    {
        return Inertia::render('ContactUs/Index');
    }

    /**
     * Method store
     *
     * @param Request $request [explicite description]
     *
     * @return void
     */
    public function store(InquireRequest $request)
    {
        $inquiryRepository = app()->make(InquiryRepository::class);
        $inquiryRepository->create($request->all());
        return redirect()->back()->with('success', 'Your inquiry has been submitted successfully.');
    }
}
