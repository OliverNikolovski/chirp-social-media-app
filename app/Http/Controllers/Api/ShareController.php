<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShareRequest;
use App\Http\Requests\UpdateShareRequest;
use App\Http\Resources\ShareResource;
use App\Models\Share;

class ShareController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShareRequest $request): ShareResource
    {
        $attributes = $request->validated();
        $attributes['user_id'] = auth()->id();
        return new ShareResource(Share::create($attributes));
    }

    /**
     * Display the specified resource.
     */
    public function show(Share $share)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShareRequest $request, Share $share)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Share $share)
    {
        //
    }
}
