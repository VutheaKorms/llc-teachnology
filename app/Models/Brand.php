<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'description',
        'status',
    ];

    public function category()
    {
        return $this->hasMany('App\Models\Category','brand_id','id');
    }

    public function products()
    {
        return $this->hasMany('App\Models\Product','brand_id','id');
    }
}
