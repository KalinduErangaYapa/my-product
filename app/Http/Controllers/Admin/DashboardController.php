<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContactUsReadEnum;
use App\Enums\InquiryStatusEnum;
use App\Enums\ProductStatusEnum;
use App\Http\Controllers\Controller;
use App\Repositories\Eloquent\Catalog\CareersRepository;
use App\Repositories\Eloquent\Catalog\InquiryRepository;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Method index
     *
     * @return void
     */
    public function index() {
        $productRepository = app()->make(ProductRepository::class);
        $product = [
            'allProducts' => $productRepository->all()->count(),
            'activeProducts' => $productRepository->getByColumn(['status' => ProductStatusEnum::Active->value])->count(),
            'inactiveProducts' => $productRepository->getByColumn(['status' => ProductStatusEnum::Inactive->value])->count(),
        ];
        $inquiryRepository = app()->make(InquiryRepository::class);
        $inquiry = [
            'allInquiry' => $inquiryRepository->all()->count(),
            'readedInquiry' => $inquiryRepository->getByColumn(['status' => InquiryStatusEnum::Read->value])->count(),
            'newInquiry' => $inquiryRepository->getByColumn(['status' => InquiryStatusEnum::NewRequest->value])->count(),
            'scamInquiry' => $inquiryRepository->getByColumn(['status' => InquiryStatusEnum::Scam->value])->count(),
        ];
        $careerRepository = app()->make(CareersRepository::class);
        $career = [
            'allCvs' => $careerRepository->all()->count(),
            'rededCvs' => $careerRepository->getByColumn(['status' => ContactUsReadEnum::Read->value])->count(),
            'newCvs' => $careerRepository->getByColumn(['status' => ContactUsReadEnum::Unread->value])->count(),
        ];
        return Inertia::render('Admin/Dashboard/Index', [
            'productDetails' => $product,
            'inquiryDetails' => $inquiry,
            'cvDetails' => $career,
        ]);
    }
}
