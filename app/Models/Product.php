<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'stock', 'image_url', 'rating', 'city'];

    public function cartProducts()
    {
        return $this->hasMany(CartProduct::class);
    }
}
