<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\Response;

class UsersController extends Controller
{
    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function index(Request $request)
    {
        $input = $request->all();
        if($request->get('search')){
            $users = User::where("name", "LIKE", "%{$request->get('search')}%")
                ->orWhere('created_at','LIKE',"%{$request->get('search')}%")
                ->paginate(5);
        }else{
            $users = User::paginate(5);
        }
        return response($users);
    }

    public function create()
    {

    }


    public function show($id)
    {
        $item = User::find($id);
        return response($item);
    }

    public function edit($id)
    {
        $item = User::find($id);
        return response($item);
    }


    public function update(Request $request, $id)
    {
        $input = $request->all();
        User::where("id",$id)->update($input);
        $item = User::find($id);
        return response($item);
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $create = User::create($input);
        return response($create);
    }

    public function destroy($id)
    {
        return User::where('id',$id)->delete();
    }
}
