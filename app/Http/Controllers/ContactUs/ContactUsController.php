<?php

namespace App\Http\Controllers\ContactUs;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUs\ContactUsRequest;
use App\Http\Traits\UtilityTrait;
use App\Repositories\Eloquent\Catalog\ContactUsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactUsController extends Controller
{

    use UtilityTrait;
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
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
    public function store(ContactUsRequest $request)
    {
        $contactUsRepository = app()->make(ContactUsRepository::class);
        $contactUsRepository->create($request->all());
        return redirect()->back()->with('success', 'Your inquiry has been submitted successfully.');
    }
}
