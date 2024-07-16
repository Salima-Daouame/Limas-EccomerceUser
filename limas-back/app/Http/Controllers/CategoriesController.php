<?php

namespace App\Http\Controllers;
use App\Models\Categorie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class CategoriesController extends Controller
{

    public function index()
{
    $categories = Categorie::with('products')->get();
    return response()->json([
        'categories' => $categories
    ], 200);
}



}
