<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJurusanRequest;
use App\Http\Requests\UpdateJurusanRequest;
use App\Http\Requests\BulkUpdateJurusanRequest;
use App\Http\Requests\BulkDeleteJurusanRequest;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class JurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index jurusan");
        
        $data = Jurusan::query()
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('jurusan/index', [
            'jurusans' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create jurusan"),
                'canShow' => $this->user->can("show jurusan"),
                'canUpdate' => $this->user->can("update jurusan"),
                'canDelete' => $this->user->can("delete jurusan"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJurusanRequest $request)
    {
        $this->pass("create jurusan");

        $data = $request->validated();
        Jurusan::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Jurusan $jurusan)
    {
        $this->pass("show jurusan");

        return Inertia::render('jurusan/show', [
            'jurusan' => $jurusan,
            'permissions' => [
                'canUpdate' => $this->user->can("update jurusan"),
                'canDelete' => $this->user->can("delete jurusan"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJurusanRequest $request, Jurusan $jurusan)
    {
        $this->pass("update jurusan");

        $data = $request->validated();
        $jurusan->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jurusan $jurusan)
    {
        $this->pass("delete jurusan");

        $jurusan->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateJurusanRequest $request)
    {
        $this->pass("update jurusan");

        $data = $request->validated();
        Jurusan::whereIn('id', $data['jurusan_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteJurusanRequest $request)
    {
        $this->pass("delete jurusan");

        $data = $request->validated();
        Jurusan::whereIn('id', $data['jurusan_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived jurusan");

        return Inertia::render('jurusan/archived', [
            'jurusans' => Jurusan::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore jurusan");

        $model = Jurusan::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete jurusan");

        $model = Jurusan::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }
    
    
}
