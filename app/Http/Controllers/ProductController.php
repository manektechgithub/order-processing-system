<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Support\Http\ListApi;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    use ListApi;

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->all());

        return new ProductResource($product->refresh());
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->variants()->detach();

        $product->delete();

        return response()->json([
            'message' => "The product with id: {$product->id} has been deleted."
        ]);
    }

    function model(): string
    {
        return Product::class;
    }

    function resource(): string
    {
        return ProductResource::class;
    }
}
