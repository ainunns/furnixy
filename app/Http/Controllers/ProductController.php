<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\ProductRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Product;
use Illuminate\Http\Request;

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
            $product->image_url = $request->file('image_url')[0]->store('images', 'public');
        }

        $product->save();

        return redirect()->intended(route('product.show', $product->id));
    }

    public function edit(string $id) {
        $product = Product::findOrFail($id);

        return Inertia::render('Product/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, string $id) {
        $product = Product::findOrFail($id);

        $product->name = $request->name ?? $product->name;
        $product->description = $request->description ?? $product->description;
        $product->price = $request->price ?? $product->price;
        $product->stock = $request->stock ?? $product->stock;
        $product->rating = $request->rating ?? $product->rating;
        $product->city = $request->city ?? $product->city;
        $product->category_id = 1;

        if ($request->hasFile('image_url')) {
            $product->image_url = $request->file('image_url')[0]->store('images', 'public');
        }

        $product->save();

        return redirect()->intended(route('product.show', $id));
    }
    public function index() {
        $product = Product::all();

        return Inertia::render('Product/Index', compact('product'));
    }

    public function show(string $id) {
        $product = Product::findOrFail($id);

        return Inertia::render('Product/Show', compact('product'));
    }

    public function destroy(string $id) {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('product.index');
    }

}
