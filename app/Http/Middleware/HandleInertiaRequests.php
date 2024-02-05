<?php

namespace App\Http\Middleware;

use App\Enums\IsFeaturedEnum;
use App\Enums\ProductStatusEnum;
use App\Repositories\Eloquent\Catalog\ProductRepository;
use App\Services\UtilityService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(
            parent::share($request),
            [
                'auth' => [
                    'user' => $request->user(),
                ],
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(),
                        [
                            'location' => $request->url(),
                        ]
                    );
                },
                'utility' => app()->make(UtilityService::class)->index(),
                'flash' => function () use ($request) {
                    return [
                        'success' => $request->session()->get('success'),
                        'error' => $request->session()->get('error'),
                    ];
                },
                'services' => app()->make(ProductRepository::class)->getByColumn(['status' => ProductStatusEnum::Active->value], ["*"]),
                "inquiryCount" => 0,
                "contactCount" => 0,
            ]
        );
    }
}
