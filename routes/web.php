<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', function () {
    $user = Auth::user();
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ] : null,
        ],
    ]);
});

Route::prefix('/product')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('product.index');
    Route::get('/{product}/detail', [ProductController::class, 'show'])->name('product.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/history', [TransactionController::class, 'index'])->name('transaction.index');
});

Route::middleware('auth', 'role:user')->group(function () {
    Route::prefix('/cart')->group(function () {
        Route::get('/', [CartController::class, 'viewCart'])->name('cart.index');
        Route::post('/add/{product}', [CartController::class, 'addToCart'])->name('cart.add');
        Route::delete('/{id}/delete', [CartController::class, 'deleteFromCart'])->name('cart.delete');
        Route::post('/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    });
});

Route::middleware('auth', 'role:admin')->group(function () {
    Route::prefix('/product')->group(function () {
        Route::get('/create', [ProductController::class, 'create'])->name('product.create');
        Route::post('/store', [ProductController::class, 'store'])->name('product.store');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
        Route::post('/{product}/update', [ProductController::class, 'update'])->name('product.update');
        Route::delete('/{product}/delete', [ProductController::class, 'destroy'])->name('product.destroy');
    });
});

require __DIR__ . '/auth.php';
