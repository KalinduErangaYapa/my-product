<?php

namespace App\Http\Controllers\Admin\Template;

use App\Enums\HomeHeroStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\HomeHeros\HomeHeroRequest;
use App\Http\Resources\HomeHeroResource;
use App\Http\Traits\UtilityTrait;
use App\Models\HomeHero;
use App\Repositories\Eloquent\Catalog\HomeHeroRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeHeroController extends Controller
{
    use UtilityTrait;

    protected $homeHeroRepository;

    /**
     * Method __construct
     *
     * @param HomeHeroRepository $homeHeroRepository [explicite description]
     *
     * @return void
     */
    public function __construct(HomeHeroRepository $homeHeroRepository)
    {
        $this->homeHeroRepository = $homeHeroRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->all('searchParam', 'sortBy', 'sortDirection', 'rowPerPage', 'page');
        $filters['sortBy'] = $filters['sortBy'] ?? "title";
        $filters['sortDirection'] = $filters['sortDirection'] ?? "asc";
        $filters['rowPerPage'] = $filters['rowPerPage'] ?? 10;
        return Inertia::render(
            'Admin/HomeHeros/All/Index',
            [
                'filters' => $filters,
                'homeHeros' => HomeHeroResource::collection($this->homeHeroRepository->filter($filters)),
                'homeHeroStatus' => $this->enumToSelect(HomeHeroStatusEnum::cases())
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $homeHero = $this->homeHeroRepository->findByColumn(['status' => HomeHeroStatusEnum::Draft->value]);
        if (!$homeHero) {
            $homeHero = $this->homeHeroRepository->create(
                [
                    'title' => 'Welcome to our store',
                    'sub_title' => null,
                    'intro' => null,
                    'color' => null,
                    'link' =>  null,
                    'image' => null,
                    'mobile_image' => null,
                    'status' => HomeHeroStatusEnum::Draft->value
                ]
            );
        }
        return Inertia::render(
            'Admin/HomeHeros/Edit/Index',
            [
                'homeHero' => $homeHero,
                'type' => 'create',
                'homeHeroStatus' => $this->enumToSelect(HomeHeroStatusEnum::cases())
            ]
        );
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomeHero $homeHero = null)
    {
        return Inertia::render(
            'Admin/HomeHeros/Edit/Index',
            [
                'homeHero' => $homeHero,
                'type' => 'edit',
                'homeHeroStatus' => $this->enumToSelect(HomeHeroStatusEnum::cases())
            ]
        );
    }

    /**
     * Method updateHomeHero
     *
     * @param HomeHeroRequest $request [explicite description]
     * @param HomeHero $homeHero [explicite description]
     *
     * @return void
     */
    public function updateHomeHero(HomeHeroRequest $request, HomeHero $homeHero)
    {
        $data = $request->all();
        $homeHeroRepository = app()->make(HomeHeroRepository::class);
        if ($data['image'] == null ||  is_string($data['image'])) {
            unset($data['image']);
        } else {
            $data['image'] = $data['image']->store('homeHero', 'public');
        }
        $homeHeroRepository->update($homeHero->id, $data);
        return redirect(route('admin.home-heros.index'))->with('success', 'Home Hero updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->homeHeroRepository->deleteById($id);
        return redirect(route('admin.home-heros.index'))->with('success', 'Home hero deleted successfully');
    }
}
