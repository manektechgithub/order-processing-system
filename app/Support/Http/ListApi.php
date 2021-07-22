<?php

namespace App\Support\Http;

use Illuminate\Http\Request;

trait ListApi
{

    public function index(Request $request)
    {
        $instance = $this->model()::query();

        if ($request->input('order_by')) {
            $order_by = explode(',', $request->input('order_by'));

            $instance->orderBy($order_by[0], isset($order_by[1]) ? strtoupper($order_by[1]) : 'ASC');
        }

        if ($request->input('paginate')) {
            return $this->resource()::collection($instance->paginate(
                $request->input('per_page')
            ));
        }

        return $this->resource()::collection($instance->get());
    }


    abstract function model(): string;

    abstract function resource(): string;
}
