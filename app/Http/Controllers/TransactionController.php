<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $categoryId = $request->query('category_id');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $category = Category::all();

        $transaction = Transaction::with(['cart_product.product.category'])
            ->whereHas('cart_product.product.category', function ($query) use ($categoryId) {
                if ($categoryId) {
                    $query->where('category_id', $categoryId);
                }
            })
            ->whereHas('cart_product', function ($query) {
                $query->where('user_id', Auth::id());
            });

        if ($startDate && $endDate) {
            $transaction = $transaction->whereBetween('created_at', [
                Carbon::parse($startDate)->startOfDay(),
                Carbon::parse($endDate)->endOfDay()
            ]);
        }
            
        $transaction = $transaction->orderBy('created_at', 'desc')->get();

        return Inertia::render('Transaction/Index', [
            'transaction' => $transaction,
            'category' => $category,
            'categoryId' => $categoryId,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
