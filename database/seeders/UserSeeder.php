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
                'email' => 'admin@axcertro.com',
                'password' => Hash::make('Axcertro#Our1st'),
            ],
            [
                'name' => 'System Admin',
                'email' => 'admin@brotherstech.com',
                'password' => Hash::make('Brotherstech#Our1st'),
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
