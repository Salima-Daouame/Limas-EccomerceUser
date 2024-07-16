<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class CartController extends Controller
{

    public function addToCart(Request $request)
    {
        $request->validate([
            'client_id' => 'required|integer|exists:clients,id',
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $cart = new Cart();
        $cart->client_id = $request->client_id;
        $cart->product_id = $request->product_id;
        $cart->save();

        return response()->json(['message' => 'Product added to cart'], 200);
    }

public function getCartItems($clientId)
{
    $cartItems = DB::table('carts')
        ->join('products', 'carts.product_id', '=', 'products.id')
        ->select('carts.*', 'products.productname as product_name', 'products.image as product_image', 'products.price as product_price')
        ->where('carts.client_id', $clientId)
        ->get()
        ->map(function ($item) {
         $item->product_image = url('http://localhost:8081/storage/' . $item->product_image);
            return $item;
        });

    return response()->json($cartItems);
}


}

