<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['cart_id', 'total_price'];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
