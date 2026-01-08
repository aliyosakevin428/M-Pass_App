<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLaporanNilaiRequest;
use App\Http\Requests\UpdateLaporanNilaiRequest;
use App\Http\Requests\BulkUpdateLaporanNilaiRequest;
use App\Http\Requests\BulkDeleteLaporanNilaiRequest;
use App\Models\LaporanNilai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanNilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $this->pass("index LaporanNilai");
    
    $data = LaporanNilai::query()
        ->with(['siswa'])
        ->when($request->name, function($q, $v){
            $q->where('name', 'like', "%{$v}%");
        })
        ->when($request->grade, function($q, $v){
            $q->where('grade', $v);
        })
        ->when($request->siswa_id, function($q, $v){
            $q->where('siswa_id', $v);
        });

    return Inertia::render('LaporanNilai/index', [
        'laporan_nilais' => $data->get(), 
        'query' => $request->input(),
        'permissions' => [
            'canAdd' => $this->user->can("create laporanNilai"),
            'canShow' => $this->user->can("show laporanNilai"),
            'canUpdate' => $this->user->can("update laporanNilai"),
            'canDelete' => $this->user->can("delete laporanNilai"),
        ]
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLaporanNilaiRequest $request)
    {
        $this->pass("create laporanNilai");

        $data = $request->validated();
        $laporanNilai = LaporanNilai::create($data);

        return redirect()
            ->route('laporanNilai.index')
            ->with('success', 'Laporan Nilai berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(LaporanNilai $laporanNilai)
    {
        $this->pass("show laporanNilai");

        return Inertia::render('LaporanNilai/show', [
            'laporan_nilai' => $laporanNilai, 
            'permissions' => [
                'canUpdate' => $this->user->can("update laporanNilai"),
                'canDelete' => $this->user->can("delete laporanNilai"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLaporanNilaiRequest $request, LaporanNilai $laporanNilai)
    {
        $this->pass("update laporanNilai");

        $data = $request->validated();
        $laporanNilai->update($data);

        return redirect()
            ->route('laporanNilai.index')
            ->with('success', 'Laporan Nilai berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LaporanNilai $laporanNilai)
    {
        $this->pass("delete laporanNilai");

        $laporanNilai->delete();

        return redirect()
            ->route('laporanNilai.index')
            ->with('success', 'Laporan Nilai berhasil dihapus');
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateLaporanNilaiRequest $request)
    {
        $this->pass("update laporanNilai");

        $data = $request->validated();
        
        $ids = $data['laporan_nilai_ids'] ?? $data['laporanNilai_ids'];
        unset($data['laporan_nilai_ids'], $data['laporanNilai_ids']);
        
        LaporanNilai::whereIn('id', $ids)->update($data);

        return redirect()
            ->route('laporanNilai.index')
            ->with('success', count($ids) . ' Laporan Nilai berhasil diupdate');
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteLaporanNilaiRequest $request)
    {
        $this->pass("delete laporanNilai");

        $data = $request->validated();
        
        $ids = $data['laporan_nilai_ids'] ?? $data['laporanNilai_ids'];
        
        LaporanNilai::whereIn('id', $ids)->delete();

        return redirect()
            ->route('laporanNilai.index')
            ->with('success', count($ids) . ' Laporan Nilai berhasil dihapus');
    }
}