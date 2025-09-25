<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAbsensiRequest;
use App\Http\Requests\UpdateAbsensiRequest;
use App\Http\Requests\BulkUpdateAbsensiRequest;
use App\Http\Requests\BulkDeleteAbsensiRequest;
use App\Models\Absensi;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadAbsensiMediaRequest;


class AbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index absensi");

        $data = Absensi::query()
            ->with(['media', 'siswa', 'kelas'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('absensi/index', [
            'absensis' => $data->get(),
            'siswas' => Siswa::get(),
            'kelas' => Kelas::get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create absensi"),
                'canShow' => $this->user->can("show absensi"),
                'canUpdate' => $this->user->can("update absensi"),
                'canDelete' => $this->user->can("delete absensi"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAbsensiRequest $request)
    {
        $this->pass("create absensi");

        $data = $request->validated();
        Absensi::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absensi $absensi)
    {
        $this->pass("show absensi");

        return Inertia::render('absensi/show', [
            'absensi' => $absensi,
            'permissions' => [
                'canUpdate' => $this->user->can("update absensi"),
                'canDelete' => $this->user->can("delete absensi"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAbsensiRequest $request, Absensi $absensi)
    {
        $this->pass("update absensi");

        $data = $request->validated();
        $absensi->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absensi $absensi)
    {
        $this->pass("delete absensi");

        $absensi->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAbsensiRequest $request)
    {
        $this->pass("update absensi");

        $data = $request->validated();
        Absensi::whereIn('id', $data['absensi_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAbsensiRequest $request)
    {
        $this->pass("delete absensi");

        $data = $request->validated();
        Absensi::whereIn('id', $data['absensi_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        $this->pass("archived absensi");

        return Inertia::render('absensi/archived', [
            'absensis' => Absensi::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $this->pass("restore absensi");

        $model = Absensi::onlyTrashed()->findOrFail($id);
        $model->restore();
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $this->pass("force delete absensi");

        $model = Absensi::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }

    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadAbsensiMediaRequest $request, Absensi $absensi)
    {
        $this->pass("update absensi");

        $data = $request->validated();
        $absensi->addMedia($data['file'])->toMediaCollection();
    }
}
