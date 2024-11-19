<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\Product;
use App\Models\CartProduct;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function viewCart()
    {
        $cart = CartProduct::with('product')->get();
        return Inertia::render('Cart/Index', compact('cart'));
    }

    public function addToCart(CartRequest $request, Product $product)
    {
        DB::beginTransaction();

        try {
            $items = CartProduct::where([['user_id', '=', Auth::id()], ['product_id', '=', $product->id], ['transaction_id', '=', NULL]])->first();

            if ($items) {
                if ($items->quantity + $request->quantity > $product->stock) {
                    DB::rollBack();

                    return redirect()->back()->withErrors(['message' => 'Number of items in cart exceeds the stock']);
                }
                $items->quantity += $request->quantity;

                $items->save();
            } else {
                $cart = new CartProduct;
                $cart->user_id = Auth::id();
                $cart->product_id = $product->id;
                $cart->quantity = $request->quantity;
                $cart->save();
            }

            DB::commit();

            return redirect()->intended(route('cart.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
