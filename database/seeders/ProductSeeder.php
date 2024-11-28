<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $products = [
      ['name' => 'Luxury Chair', 'description' => 'Comfortable luxury chair.', 'price' => 3147503, 'stock' => 10, 'image_url' => 'images/chair1.jpg', 'rating' => 4.5, 'city' => 'New York', 'categories' => ['Chair', 'wooden chair']],
      ['name' => 'Elegant Sofa', 'description' => 'Modern elegant sofa.', 'price' => 6295005, 'stock' => 5, 'image_url' => 'images/sofa1.jpg', 'rating' => 4.8, 'city' => 'Los Angeles', 'categories' => ['Sofa', 'wooden sofa']],
      ['name' => 'Dining Table', 'description' => 'Classic dining table.', 'price' => 4724998, 'stock' => 8, 'image_url' => 'images/table1.jpg', 'rating' => 4.3, 'city' => 'Chicago', 'categories' => ['Table', 'wooden table']],
      ['name' => 'Office Chair', 'description' => 'Ergonomic office chair.', 'price' => 2362498, 'stock' => 15, 'image_url' => 'images/chair2.jpg', 'rating' => 4.6, 'city' => 'Houston', 'categories' => ['computer chair', 'Chair']],
      ['name' => 'Gaming Table', 'description' => 'Durable gaming table.', 'price' => 3937498, 'stock' => 7, 'image_url' => 'images/table2.jpg', 'rating' => 4.7, 'city' => 'Phoenix', 'categories' => ['computer table', 'Table']],
      ['name' => 'Cozy Couch', 'description' => 'Comfortable couch.', 'price' => 5670003, 'stock' => 6, 'image_url' => 'images/couch1.jpg', 'rating' => 4.5, 'city' => 'San Diego', 'categories' => ['couch', 'Sofa']],
      ['name' => 'Dining Chair Set', 'description' => 'Set of 4 dining chairs.', 'price' => 1574998, 'stock' => 20, 'image_url' => 'images/chair3.jpg', 'rating' => 4.4, 'city' => 'Dallas', 'categories' => ['dining chair', 'Chair']],
      ['name' => 'Ironing Table', 'description' => 'Adjustable ironing table.', 'price' => 1417498, 'stock' => 25, 'image_url' => 'images/table3.jpg', 'rating' => 4.2, 'city' => 'San Jose', 'categories' => ['ironing table', 'Table']],
      ['name' => 'Metal Folding Chair', 'description' => 'Durable metal chair.', 'price' => 787503, 'stock' => 30, 'image_url' => 'images/chair4.jpg', 'rating' => 4.0, 'city' => 'Austin', 'categories' => ['metal chair', 'Chair']],
      ['name' => 'Executive Office Table', 'description' => 'Spacious office table.', 'price' => 6295003, 'stock' => 3, 'image_url' => 'images/table4.jpg', 'rating' => 4.9, 'city' => 'San Francisco', 'categories' => ['office table', 'Table']],
      ['name' => 'Plastic Patio Chair', 'description' => 'Lightweight plastic chair.', 'price' => 314998, 'stock' => 40, 'image_url' => 'images/chair5.jpg', 'rating' => 4.1, 'city' => 'Seattle', 'categories' => ['plastic chair', 'Chair']],
      ['name' => 'Restaurant Chair', 'description' => 'Stylish restaurant chair.', 'price' => 1259998, 'stock' => 12, 'image_url' => 'images/chair6.jpg', 'rating' => 4.3, 'city' => 'Denver', 'categories' => ['restaurant chair', 'Chair']],
      ['name' => 'Student Study Table', 'description' => 'Compact study table.', 'price' => 1417498, 'stock' => 18, 'image_url' => 'images/table5.jpg', 'rating' => 4.2, 'city' => 'Washington', 'categories' => ['study table', 'Table']],
      ['name' => 'Wooden Dining Chair', 'description' => 'Elegant wooden chair.', 'price' => 2047498, 'stock' => 10, 'image_url' => 'images/chair7.jpg', 'rating' => 4.6, 'city' => 'Boston', 'categories' => ['wooden chair', 'Chair']],
      ['name' => 'Wooden Sofa Set', 'description' => 'Beautiful wooden sofa.', 'price' => 7869998, 'stock' => 4, 'image_url' => 'images/sofa2.jpg', 'rating' => 4.8, 'city' => 'Miami', 'categories' => ['wooden sofa', 'Sofa']],
      ['name' => 'Wooden Dining Table', 'description' => 'Large wooden table.', 'price' => 9449998, 'stock' => 2, 'image_url' => 'images/table6.jpg', 'rating' => 4.9, 'city' => 'Atlanta', 'categories' => ['wooden table', 'Table']],
    ];

    foreach ($products as $productData) {
      $categories = $productData['categories'];
      unset($productData['categories']);

      $product = Product::create($productData);

      $categoryIds = Category::whereIn('name', $categories)->pluck('id');
      $product->category()->attach($categoryIds);
    }

    exec('cp -r public/images/seed/* storage/app/public/images');
  }
}
