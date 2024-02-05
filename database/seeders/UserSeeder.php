<?php

namespace Database\Seeders;

use App\Repositories\Eloquent\UserRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $array = [
            [
                'name' => 'System Admin',
                'email' => 'kalinduyapa@gmail.com',
                'password' => Hash::make('#Our1st'),
            ],
            [
                'name' => 'System Admin',
                'email' => 'admin@product.com',
                'password' => Hash::make('Product#our1st'),
            ],
        ];
        $userRepository = app()->make(UserRepository::class);
        foreach ($array as $key => $item) {
            if (!$userRepository->existsByColumn(['email' => $item['email']])) {
                $userRepository->create($item);
            }
        }
    }
}
