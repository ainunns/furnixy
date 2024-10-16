<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartProduct;
use Inertia\Inertia;
use App\Models\User;

class CartController extends Controller
{
    public function viewCart() {
        $cart = CartProduct::with('product')->get();
        return Inertia::render('Cart/Index', compact('cart'));
    }

    public function addToCart(CartRequest $request, Product $product) {
        $user = auth()->user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartProduct = CartProduct::create([
            'cart_id' => $cart->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);
        $cartProduct->save();

        return redirect()->route('cart.index');
    }
}
