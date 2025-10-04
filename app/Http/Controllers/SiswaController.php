<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Http\Requests\BulkUpdateSiswaRequest;
use App\Http\Requests\BulkDeleteSiswaRequest;
use App\Models\Kelas;
use App\Models\Orangtua;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadSiswaMediaRequest;


class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index siswa");

        $data = Siswa::query()
            ->with(['media', 'kelas', 'orangtua'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('siswa/index', [
            'siswas' => $data->get(),
            'kelas' => Kelas::get(),
            'orangtuas' => Orangtua::get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create siswa"),
                'canShow' => $this->user->can("show siswa"),
                'canUpdate' => $this->user->can("update siswa"),
                'canDelete' => $this->user->can("delete siswa"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiswaRequest $request)
    {
        $this->pass("create siswa");

        $data = $request->validated();
        Siswa::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        $this->pass("show siswa");

        return Inertia::render('siswa/show', [
            'siswa' => $siswa,
            'permissions' => [
                'canUpdate' => $this->user->can("update siswa"),
                'canDelete' => $this->user->can("delete siswa"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiswaRequest $request, Siswa $siswa)
    {
        $this->pass("update siswa");

        $data = $request->validated();
        $siswa->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        $this->pass("delete siswa");

        $siswa->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateSiswaRequest $request)
    {
        $this->pass("update siswa");

        $data = $request->validated();
        Siswa::whereIn('id', $data['siswa_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteSiswaRequest $request)
    {
        $this->pass("delete siswa");

        $data = $request->validated();
        Siswa::whereIn('id', $data['siswa_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived siswa");

        return Inertia::render('siswa/archived', [
            'siswas' => Siswa::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore siswa");

        $model = Siswa::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete siswa");

        $model = Siswa::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }

    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadSiswaMediaRequest $request, Siswa $siswa)
    {
        $this->pass("update siswa");

        $data = $request->validated();
        $siswa->addMedia($data['file'])->toMediaCollection();
    }
}
