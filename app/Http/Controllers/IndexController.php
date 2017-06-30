<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class IndexController extends Controller
{
    public function index()
    {
        $brands = DB::table('brands')->get();

        $categories = DB::table('brands')
            ->join('categories', function ($join) {
                $join->on('brands.id', '=', 'categories.brand_id');
            })
            ->get();

        return view('welcome', ['brands' => $brands, 'categories' => $categories]);
    }
}
