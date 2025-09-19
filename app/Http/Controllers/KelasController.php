<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Http\Requests\BulkUpdateKelasRequest;
use App\Http\Requests\BulkDeleteKelasRequest;
use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;


class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index kelas");

        $data = Kelas::query()
            ->with(['guru', 'jurusan'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('kelas/index', [
            'kelas' => $data->get(),
            'gurus' => Guru::get(),
            'jurusans' => Jurusan::get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create kelas"),
                'canShow' => $this->user->can("show kelas"),
                'canUpdate' => $this->user->can("update kelas"),
                'canDelete' => $this->user->can("delete kelas"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKelasRequest $request)
    {
        $this->pass("create kelas");

        $data = $request->validated();
        Kelas::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelas $kelas)
    {
        $this->pass("show kelas");

        return Inertia::render('kelas/show', [
            'kelas' => $kelas,
            'permissions' => [
                'canUpdate' => $this->user->can("update kelas"),
                'canDelete' => $this->user->can("delete kelas"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKelasRequest $request, Kelas $kelas)
    {
        $this->pass("update kelas");

        $data = $request->validated();
        $kelas->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kelas)
    {
        $this->pass("delete kelas");

        $kelas->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateKelasRequest $request)
    {
        $this->pass("update kelas");

        $data = $request->validated();
        Kelas::whereIn('id', $data['kelas_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteKelasRequest $request)
    {
        $this->pass("delete kelas");

        $data = $request->validated();
        Kelas::whereIn('id', $data['kelas_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived kelas");

        return Inertia::render('kelas/archived', [
            'kelas' => Kelas::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore kelas");

        $model = Kelas::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete kelas");

        $model = Kelas::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }


}
