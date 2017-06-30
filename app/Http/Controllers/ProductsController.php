<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;
use Session;

class ProductsController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }


    public function index(Request $request)
    {
        $input = $request->all();
        if($request->get('search')){
            $products = Product::with('brand','categories')->where("product_name", "LIKE", "%{$request->get('search')}%")
                ->orWhere('created_at','LIKE',"%{$request->get('search')}%")
                ->paginate(5);
        }else{
            $products = Product::with('brand','categories')->paginate(5);
        }
        return response($products);
    }


    public function show($id)
    {
        $products = Product::with('categories')->find($id);
        return response($products);
    }

    public function edit($id)
    {
        $item = Product::find($id);
        return response($item);
    }


    public function update(Request $request, $id)
    {
        $input = $request->all();
        Product::where("id",$id)->update($input);
        $item = Product::find($id);
        return response($item);
    }



    public function store(Request $request)
    {
        $input = $request->all();
        $create = Product::create($input);
        $id = Session::put('progress', $create->id);
        $value = $request->session()->get('progress');

        //$id = Session::get('progress');

        $file = fopen("test.txt","a");
        fwrite($file,"instore id: ". $value);
        fclose($file);

        //Session::put('pro_id', $create->id);
        //$this->productId = $create->id;
        return response($id);
    }

    public function upload(Request $request)
    {
        $id = $request->session()->get('progress');

        $file = fopen("test.txt","a");
        fwrite($file,"get id: ". $id);
        fclose($file);


    }

    public function destroy($id)
    {
        return Product::where('id',$id)->delete();
    }

    public  function disable(Request $request, $id) {
        try{
            $products= Product::findOrFail($id);
            $products->status = $request[0];
            $products->updated_at = $request['$updated_at'];
            $products->save();
            return response($products);
         }
        catch(ModelNotFoundException $err){
            //Show error page
        }
    }

//    function getProductId(Request $request) {
//        $product_id = $request['product_id'];
//        $newProId = $product_id;
//        return $newProId;
//
//    }

//    public function getProductId(Request $request)
//    {
//        $product = new Product();
//        $product->product_id = $request->input('product_id');
//        $id = $product->product_id;
//        return $id;
//
//        //print_r($product->product_id);
//
////        //$item = Product::find($newProId);
////        $item =Product::where('id',$newProId)->first();
////        $this->productId = $item;
////        return $this->productId;
////        print_r($this->productId);
//    }

//    public function method2()
//    {
//        return $this->productId;
//    }


//    public function getProductId($newProductId) {
//        $this->productId = $newProductId;
//        //$value = Session::put('productId', $newProductId);
//        //$value=Session::get('productId');
//        return $this->productId;
//        print_r($this->productId);
//
//    }

//    public function upload(Request $request)
//    {
//        $this->productId = $request->input('product_id');
//        $product_id = $this->getProductId(61);
//
//        $upload = new ProductPhoto();
//        //$upload->filename = "'" . $uploadPath . "'";
//        $upload->product_id = $product_id;
//
//        $upload->save();
//
//
////        $product_id  = $request->input('productId');
////        echo $this->getProductId($product_id);
////        print_r($this->getProductId($product_id));
//
//        //echo $this->method2();
//
//        //return $this->productId;
////        Session::get('productId');
//        //$product_id = $this->getProductId('productId');
//        //print_r($this->productId);
//
//        //return $this->productId;
//        //print_r($this->productId);
//        //$tempPath = $_FILES['file']['tmp_name'];
//
//        //$tmp_input = Input::all();
//        //$tempPath  = $tmp_input['file']['tmp_name'];
//        //print_r($tempPath); exit(0);
//        //$uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
//
//        //$uploadPath = 'uploads/' . $_FILES['file']['name'];
//
//        //move_uploaded_file($tempPath, $uploadPath);
////        $product_id  = $request->input('product_id');
////        //echo $product_id;
////        print_r($product_id);
//
////        $upload = new ProductPhoto();
////        //$upload->filename = "'" . $uploadPath . "'";
////        $upload->product_id = $product_id;
////
////        $upload->save();
//
//        //$answer = array('answer' => 'File transfer completed', 'uploadPath' => $uploadPath);
//        //$json = json_encode($answer);
//
//        //echo $json;
//    }

}
