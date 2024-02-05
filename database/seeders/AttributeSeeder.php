<?php

namespace Database\Seeders;

use App\Repositories\Eloquent\Catalog\AttributeRepository;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $array = ["Color", "Size", "Material", "Style"];
        $attributeRepository = app()->make(AttributeRepository::class);
        foreach ($array as $key => $value) {
            $attribute = $attributeRepository->findByColumn(['name' => $value]);
            if (!$attribute) {
                $attributeRepository->create(["name" => $value]);
            }
        }
    }
}
