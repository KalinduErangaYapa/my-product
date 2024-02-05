<?php

namespace App\Http\Controllers\FAQ;

use App\Enums\CategoryStatusEnum;
use App\Http\Controllers\Controller;
use App\Repositories\Eloquent\Catalog\FaqRepository;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Method __invoke
     *
     * @return Response
     */
    public function index(): Response
    {
        $faqRepository = app()->make(FaqRepository::class);
        return Inertia::render('FAQ/Index', [
            "faqs" => $faqRepository->getByColumn(['status' => CategoryStatusEnum::Active->value]),
        ]);
    }
}
