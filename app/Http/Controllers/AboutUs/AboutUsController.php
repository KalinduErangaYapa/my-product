<?php

namespace App\Http\Controllers\AboutUs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutUsController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('AboutUs/Index');
    }
}
