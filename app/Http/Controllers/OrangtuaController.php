<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrangtuaRequest;
use App\Http\Requests\UpdateOrangtuaRequest;
use App\Http\Requests\BulkUpdateOrangtuaRequest;
use App\Http\Requests\BulkDeleteOrangtuaRequest;
use App\Models\Orangtua;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrangtuaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index orangtua");

        $data = Orangtua::query()
            ->with(['siswa'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('orangtua/index', [
            'orangtuas' => $data->get(),
            'siswas' => Siswa::get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create orangtua"),
                'canShow' => $this->user->can("show orangtua"),
                'canUpdate' => $this->user->can("update orangtua"),
                'canDelete' => $this->user->can("delete orangtua"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrangtuaRequest $request)
    {
        $this->pass("create orangtua");

        $data = $request->validated();
        Orangtua::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Orangtua $orangtua)
    {
        $this->pass("show orangtua");

        return Inertia::render('orangtua/show', [
            'orangtua' => $orangtua,
            'permissions' => [
                'canUpdate' => $this->user->can("update orangtua"),
                'canDelete' => $this->user->can("delete orangtua"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrangtuaRequest $request, Orangtua $orangtua)
    {
        $this->pass("update orangtua");

        $data = $request->validated();
        $orangtua->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orangtua $orangtua)
    {
        $this->pass("delete orangtua");

        $orangtua->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateOrangtuaRequest $request)
    {
        $this->pass("update orangtua");

        $data = $request->validated();
        Orangtua::whereIn('id', $data['orangtua_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteOrangtuaRequest $request)
    {
        $this->pass("delete orangtua");

        $data = $request->validated();
        Orangtua::whereIn('id', $data['orangtua_ids'])->delete();
    }




}
