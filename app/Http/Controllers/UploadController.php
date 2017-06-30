<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use App\Http\Requests\UploadRequest;

class UploadController extends Controller
{
    public function uploadForm()
    {
        return view('upload_form');
    }

    public function uploadSubmit(UploadRequest $request)
    {
        $product = Product::create($request->all());
        foreach ($request->photos as $photo) {
            $filename = $photo->store('photos');
            ProductPhoto::create([
                'product_id' => 1,
                'filename' => $filename
            ]);
        }
        return 'Upload successful!';
    }
}
