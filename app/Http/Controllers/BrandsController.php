<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class BrandsController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function getAllActive($status) {
        $brands = Brand::where('status', $status)
            ->orderBy('name', 'desc')
            ->take(10)
            ->get();
        return response($brands);
    }

    public function index(Request $request)
    {
        $input = $request->all();
        if($request->get('search')){
            $brands = Brand::where("name", "LIKE", "%{$request->get('search')}%")
                ->orWhere('created_at','LIKE',"%{$request->get('search')}%")
                ->paginate(5);
        }else{
            $brands = Brand::paginate(5);
        }
        return response($brands);
    }

    public function create()
    {

    }

    public function show($id)
    {
        $item = Brand::find($id);
        return response($item);
    }

    public function edit($id)
    {
        $item = Brand::find($id);
        return response($item);
    }


    public function update(Request $request, $id)
    {
        $input = $request->all();
        Brand::where("id",$id)->update($input);
        $item = Brand::find($id);
        return response($item);
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $create = Brand::create($input);
        return response($create);
    }

    public function destroy($id)
    {
        return Brand::where('id',$id)->delete();
    }

    public  function disable(Request $request, $id) {
        try{
            $brand= Brand::findOrFail($id);
            $brand->status = $request[0];
            $brand->updated_at = $request['$updated_at'];
            $brand->save();
            return response($brand);
        }
        catch(ModelNotFoundException $err){
            //Show error page
        }
    }

}
