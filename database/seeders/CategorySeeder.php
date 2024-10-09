<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Chair'],
            ['name' => 'Sofa'],
            ['name' => 'Table'],
            ['name' => 'computer chair'],
            ['name' => 'computer table'],
            ['name' => 'couch'],
            ['name' => 'dining chair'],
            ['name' => 'ironing table'],
            ['name' => 'metal chair'],
            ['name' => 'office table'],
            ['name' => 'plastic chair'],
            ['name' => 'restaurant chair'],
            ['name' => 'study table'],
            ['name' => 'wooden chair'],
            ['name' => 'wooden sofa'],
            ['name' => 'wooden table'],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
