<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_code',
        'product_name',
        'description',
        'price',
        'brand_id',
        'category_id',
        'status',
    ];

    public function brand()
    {
        return $this->belongsTo('App\Models\Brand','brand_id');
    }

    /**
     * Get the category that the product belongs to.
     */
    public function categories()
    {
        return $this->belongsTo('App\Models\Category','category_id');
    }

    public function product_photos()
    {
        return $this->hasMany('App\Models\ProductPhoto','product_id','id');
    }

//        public function categories()
//        {
//            return $this->belongsToMany('App\Models\Category','product_category','product_id','category_id');
//        }
}
