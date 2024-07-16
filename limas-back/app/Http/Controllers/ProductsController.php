<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Categorie;
class ProductsController extends Controller
{

    public function getRings()
    {
        $products = Product::where('categorie_id', 1)->get();
        return response()->json($products);
    }
    public function getsunglassses()
    {
        $products = Product::where('categorie_id', 2)->get();
        return response()->json($products);
    }
    public function getnacklaces()
    {
        $products = Product::where('categorie_id', 3)->get();
        return response()->json($products);
    }
    public function getwatches()
    {
        $products = Product::where('categorie_id', 4)->get();
        return response()->json($products);
    }

    public function getprodutcs(){
        $categories = Categorie::with('products')->get();

        return response()->json([
            'categories' => $categories
        ], 200);
    }

}

