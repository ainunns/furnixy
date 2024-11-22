<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transaction = Transaction::with(['cart_product.product'])
            ->whereHas('cart_product', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Transaction/Index', [
            'transaction' => $transaction
        ]);
    }
}
