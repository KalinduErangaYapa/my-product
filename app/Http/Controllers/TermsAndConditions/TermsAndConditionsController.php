<?php

namespace App\Http\Controllers\TermsAndConditions;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TermsAndConditionsController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('TermsAndConditions/Index');
    }
}
