<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\Product;
use App\Models\CartProduct;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    public function viewCart()
    {
        $cart = CartProduct::with('product')->where([['user_id', '=', Auth::id()], ['transaction_id', '=', NULL]])->get();
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

    function deleteFromCart(string $id)
    {
        $cart = CartProduct::findOrFail($id);
        $cart->delete();

        return redirect()->intended(route('cart.index'));
    }

    function checkout(Request $request)
    {
        $validatedCart = $request->validate([
            'product_id' => 'required|array',
            'product_id.*' => 'required|string|exists:cart_products,id',
        ]);

        DB::beginTransaction();

        try {
            $transaction = new Transaction;

            $total_price = 0;
            for($i = 0; $i < count($validatedCart['product_id']); $i++) {
                $cartProduct = CartProduct::findOrFail($validatedCart['product_id'][$i]);

                if (!$cartProduct) {
                    DB::rollBack();
                    return redirect()->back()->withErrors(['message' => 'Cart item not found']);
                }

                if ($cartProduct->quantity > $cartProduct->product->stock) {
                    DB::rollBack();
                    return redirect()->back()->withErrors(['message' => 'Number of items in cart exceeds the stock']);
                }

                $total_price += $cartProduct->product->price * $cartProduct->quantity;

                $product = Product::findOrFail($cartProduct->product_id);
                $product->stock -= $cartProduct->quantity;
                $product->save();
            }

            $transaction->total_price = $total_price;
            $transaction->save();

            for($i = 0; $i < count($validatedCart['product_id']); $i++) {
                $cartProduct = CartProduct::findOrFail($validatedCart['product_id'][$i]);

                $cartProduct->transaction_id = $transaction->id;
                $cartProduct->save();
            }

            DB::commit();

            return redirect()->intended(route('transaction.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
