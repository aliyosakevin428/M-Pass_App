<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGuruRequest;
use App\Http\Requests\UpdateGuruRequest;
use App\Http\Requests\BulkUpdateGuruRequest;
use App\Http\Requests\BulkDeleteGuruRequest;
use App\Models\Guru;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index guru");
        
        $data = Guru::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('guru/index', [
            'gurus' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create guru"),
                'canShow' => $this->user->can("show guru"),
                'canUpdate' => $this->user->can("update guru"),
                'canDelete' => $this->user->can("delete guru"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuruRequest $request)
    {
        $this->pass("create guru");

        $data = $request->validated();
        Guru::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guru $guru)
    {
        $this->pass("show guru");

        return Inertia::render('guru/show', [
            'guru' => $guru,
            'permissions' => [
                'canUpdate' => $this->user->can("update guru"),
                'canDelete' => $this->user->can("delete guru"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuruRequest $request, Guru $guru)
    {
        $this->pass("update guru");

        $data = $request->validated();
        $guru->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        $this->pass("delete guru");

        $guru->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateGuruRequest $request)
    {
        $this->pass("update guru");

        $data = $request->validated();
        Guru::whereIn('id', $data['guru_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteGuruRequest $request)
    {
        $this->pass("delete guru");

        $data = $request->validated();
        Guru::whereIn('id', $data['guru_ids'])->delete();
    }

    
    
    
}
