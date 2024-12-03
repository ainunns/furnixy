<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function create()
    {
        $options = Category::all()->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });

        return Inertia::render('Product/Create', compact('options'));
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {

            $product = new Product;
            
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->rating = 0.0;
            $product->city = $request->city;
            $product->image_url = $request->file('image_url')[0]->store('images', 'public');
            
            $product->save();
            
            $categoryIds = $request->input('categories');
            $product->category()->attach($categoryIds);
            
            DB::commit();
            
            return redirect()->intended(route('product.show', $product->id));
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function edit(string $id) {
        $product = Product::with('category')->findOrFail($id);
        $options = Category::all()->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });

        return Inertia::render('Product/Edit', [
            'product' => $product,
            'options' => $options
        ]);
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->city = $request->city;

            $product->save();

            $categoryIds = $request->input('categories');
            $product->category()->sync($categoryIds);

            DB::commit();

            return redirect()->intended(route('product.show', $product->id));
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function index(Request $request) {
        $query = $request->query('search');
        $product = Product::with('category')->get();
        
        if($query) {
            $response = Http::post('https://ecommerce-search-engine.onrender.com/search', [
                'query' => $query,
                'records' => $product->toArray(),
                'confidence' => 0.3
            ]);

            $product = collect($response->json());
        }

        $category = Category::all();

        return Inertia::render('Product/Index', [
            'product' => $product,
            'category' => $category
        ]);
    }
    
    public function show(string $id) {
        $product = Product::with('category')->findOrFail($id);
        
        return Inertia::render('Product/Show', [
            'product' => $product
        ]);
    }

    
    public function destroy(string $id) {
        $product = Product::findOrFail($id);
        if (Storage::disk('public')->exists($product->image_url)) {
            Storage::disk('public')->delete($product->image_url);
        }
        $product->delete();

        return redirect()->intended(route('product.index'));
    }

}
