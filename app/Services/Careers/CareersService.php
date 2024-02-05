<?php

namespace App\Services\Careers;

use App\Http\Traits\ImageUploadTrait;
use App\Repositories\Eloquent\Catalog\CareersRepository;

class CareersService
{
    use ImageUploadTrait;
    /**
     * The repository interface to use in this service.
     */
    protected $careersRepository;
    /**
     * Method __construct
     *
     * @param  CareersRepository  $userRepository [Careers Repository]
     * @return void
     */
    public function __construct(CareersRepository $careersRepository)
    {
        $this->careersRepository = $careersRepository;
    }

    public function store(mixed $request)
    {
        $data = $request->all();
        $careersRepository = app()->make(CareersRepository::class);
        $path = $data['cv']->store('careers', 'public');
        $data['cv'] = $path;
        $careersRepository->create($data);
        return redirect()->back()->with('success', 'Your details has been submitted successfully.');
    }
}
