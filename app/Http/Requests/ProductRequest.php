<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric'],  // Changed from decimal:10,2 for simplicity
            'stock' => ['required', 'integer'],
            'image_url' => ['required', 'image', 'mimes:jpeg'],  // Since you're accepting jpeg images
            'city'  => ['required', 'string'],
        ];
    }
}
