<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description'];

    /**
     * The variants that belong to the product.
     */
    public function variants()
    {
        return $this->belongsToMany('App\Models\Variant');
    }
}
