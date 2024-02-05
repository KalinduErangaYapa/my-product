<?php

namespace App\Http\Controllers\PrivacyAndPolicy;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PrivacyAndPolicyController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('PrivacyAndPolicy/Index');
    }
}
