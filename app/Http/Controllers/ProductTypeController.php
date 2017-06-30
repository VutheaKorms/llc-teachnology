<?php

namespace App\Http\Controllers;

use App\ProductType;
use Illuminate\Http\Request;
use Response;
use Session;


class ProductTypeController extends Controller
{

    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function index()
    {
        $productTypes = ProductType::all();
        return response($productTypes);
    }

    public function create()
    {
        //
    }

    public function show($id)
    {
        $productTypes = ProductType::findOrFail($id);
        return $productTypes;
    }

    public function edit($id)
    {
        $productType = Task::findOrFail($id);
        return $productType;
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);


        $put = ProductType::findOrFail($id);

        $put->update([
            'name' => $request->get('name'),
            'description' => $request->get('description')
        ]);

        return $put->id;
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $post = new ProductType;
        $post->name = $request->name;
        $post->description = $request->description;

        $post->save();

        return $post->id;
    }

    public function destroy($id)
    {
        $item = ProductType::findOrFail($id);
        $item->delete();
        return $item->id;
    }

}
