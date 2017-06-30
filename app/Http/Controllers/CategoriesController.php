<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class CategoriesController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function getAllActive($status) {
        $categories = Category::where('status', $status)
            ->orderBy('name', 'desc')
            ->take(10)
            ->get();
        return response($categories);
    }

    public function index(Request $request)
    {
        $input = $request->all();
        if($request->get('search')){
            $categories = Category::with('brand')->where("name", "LIKE", "%{$request->get('search')}%")
                ->orWhere('created_at','LIKE',"%{$request->get('search')}%")
                ->paginate(5);
        }else{
            $categories = Category::with('brand')->paginate(5);
        }
        return response($categories);
    }

    public function create()
    {

    }

    public function show($id)
    {
        $categories = Category::with('brand')->find($id);
        return response($categories);
    }

    public function edit($id)
    {
        $item = Category::find($id);
        return response($item);
    }


    public function update(Request $request, $id)
    {
        $input = $request->all();
        Category::where("id",$id)->update($input);
        $item = Category::find($id);
        return response($item);
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $create = Category::create($input);
        return response($create);
    }

    public function destroy($id)
    {
        return Category::where('id',$id)->delete();
    }

    public  function disable(Request $request, $id) {
        try{
            $category= Category::findOrFail($id);
            $category->status = $request[0];
            $category->updated_at = $request['$updated_at'];
            $category->save();
            return response($category);
        }
        catch(ModelNotFoundException $err){
            //Show error page
        }
    }
}
