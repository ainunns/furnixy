<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(
            [
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('Password123'),
            'role' => 'admin',
            ]
            );
    }
}
