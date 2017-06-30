<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $fillable = ['product_id', 'filename', 'size','type','thumb_path','path','status'];

    public function product()
    {
        return $this->belongsTo('App\Models\Product','product_id');
    }
}
