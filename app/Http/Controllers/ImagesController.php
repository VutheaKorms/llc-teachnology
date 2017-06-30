<?php

namespace App\Http\Controllers;

use App\Image;
use App\ImageType;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class ImagesController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function index()
    {
       // $images = Image::all();
//        return response($images);

//        $images = ImageType::with('images')->get();
//        return response($images);

        $images = Image::with('image_types')->get();
        return response($images);
    }

    public function create()
    {

    }

    public function show($id)
    {

    }

    public function edit($id)
    {

    }


    public function update(Request $request, $id)
    {

    }


    public function store(Request $request)
    {

    }

    public function destroy($id)
    {

    }

}
