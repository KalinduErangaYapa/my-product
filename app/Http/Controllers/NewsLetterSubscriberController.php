<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsLetterSubscriberRequest;
use App\Repositories\Eloquent\NewsLetterSubscriberRepository;

class NewsLetterSubscriberController extends Controller
{
    protected $newsLetterSubscriber;

    public function __construct(NewsLetterSubscriberRepository $newsLetterSubscriber)
    {
        $this->newsLetterSubscriber = $newsLetterSubscriber;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewsLetterSubscriberRequest $request)
    {
        if (!$this->newsLetterSubscriber->findByColumn(['email' => $request->email])) {
            $this->newsLetterSubscriber->create($request->all());
        }
        return redirect()->back()->with('success', 'Thank you for subscribing.');
    }
}
