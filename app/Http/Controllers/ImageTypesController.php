<?php

namespace App\Http\Controllers;

use App\ImageType;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class ImageTypesController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function index()
    {
        $imageTypes = ImageType::all();
        return response($imageTypes);
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
