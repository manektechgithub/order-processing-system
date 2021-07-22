<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    /**
     * The products that belong to the product.
     */
    public function variants()
    {
        return $this->belongsToMany('App\Models\Variant');
    }
}
