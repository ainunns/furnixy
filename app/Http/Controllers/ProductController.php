<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\ProductRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Product;

class ProductController extends Controller
{
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $product = new Product;

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->rating = 0.0;
        $product->city = $request->city;
        $product->category_id = 1;
        

        if ($request->hasFile('image_url')) {
            $product->image_url = $request->file('image_url')->store('images', 'public');
        }

        $product->save();

        return redirect()->intended(route('dashboard'));
    }

}
