<?php

namespace App\Services\Faq;

use App\Http\Traits\ImageUploadTrait;
use App\Repositories\Eloquent\Catalog\FaqRepository;

class FaqService
{
    use ImageUploadTrait;
    /**
     * The repository interface to use in this service.
     */
    protected $faqRepository;
    /**
     * Method __construct
     *
     * @param  faqRepository  $userRepository [Faq Repository]
     * @return void
     */
    public function __construct(FaqRepository $faqRepository)
    {
        $this->faqRepository = $faqRepository;
    }

    public function store(mixed $request)
    {
        $data = $request->all();
        $careersRepository = app()->make(FaqRepository::class);
        $path = $data['cv']->store('careers', 'public');
        $data['cv'] = $path;
        $careersRepository->create($data);
        return redirect()->back()->with('success', 'Your details has been submitted successfully.');
    }
}
