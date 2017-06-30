<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('brands','BrandsController');
Route::put('brands/disable/{id}','BrandsController@disable');
Route::get('brands/status/{status}','BrandsController@getAllActive');

Route::resource('categories','CategoriesController');
Route::put('categories/disable/{id}','CategoriesController@disable');
Route::get('categories/status/{status}','CategoriesController@getAllActive');

//Route::resource('products','ProductsController');
Route::put('products/disable/{id}','ProductsController@disable');

//Route::group(['middleware' => ['web']], function () {
//    Route::resource('products','ProductsController');
//    Route::put('products/disable/{id}','ProductsController@disable');
//});

Route::group(['middleware' => ['web']], function () {
    Route::resource('products','ProductsController');
    Route::post('test/upload','ProductsController@upload');
});

//Route::group(['middleware' => ['api']], function () {
//    Route::post('test/upload','ProductsController@upload');
//});


//Route::get('products/getProId','ProductsController@getProductId');

////Route::resource('users','UsersController');
//
//Route::group(['middleware' => 'auth.basic'], function () {
//    Route::group(array('prefix' => ''), function() {
//        Route::resource('users', 'UsersController',
//            array('only' => array('index', 'store', 'destroy')));
//    });
//});


//Route::group(array('prefix' => ''), function() {
//    Route::resource('productTypes', 'ProductTypeController',
//        array('only' => array('index', 'store', 'destroy', 'update','show')));
//});
//
//Route::resource('items', 'ItemController');
//Route::resource('productCategories', 'ProductCategoryController');
//Route::resource('imageTypes', 'ImageTypesController');
//Route::resource('images', 'ImagesController');
