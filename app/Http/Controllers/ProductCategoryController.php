<?php

namespace App\Http\Controllers;

use App\ProductCategory;
use App\ProductType;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
//        $input = $request->all();
//        if($request->get('search')){
//            $items = ProductCategory::where("name", "LIKE", "%{$request->get('search')}%")
//                ->paginate(5);
//        }else{
//            $items = ProductCategory::paginate(5);
//        }
//        return response($items);



//        $productCate = ProductType::with('product_categories')->paginate(5);
//        return response($productCate);

        $productCate = ProductCategory::with('product_types')->paginate(5);
        return response($productCate);


    }
    public function store(Request $request)
    {
        $input = $request->all();
        $create = ProductCategory::create($input);
        return response($create);
    }
    public function edit($id)
    {
        $item = ProductCategory::find($id);
        return response($item);
    }

    public function update(Request $request,$id)
    {
        $input = $request->all();
        Item::where("id",$id)->update($input);
        $item = ProductCategory::find($id);
        return response($item);
    }
    public function destroy($id)
    {
        return ProductCategory::where('id',$id)->delete();
    }

    public function show($id)
    {
//        //$item = ProductCategory::find($id);
//        $item = ProductCategory::with('ProductType')->find($id);
//        //return $item->ProductType->name;
        $Name = ProductCategory::find(1)->product_types->name;
        return response($Name);
    }


}
