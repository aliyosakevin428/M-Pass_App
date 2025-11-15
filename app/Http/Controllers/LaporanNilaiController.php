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
            //->with(['media'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('LaporanNilai/index', [
            'laporanNilais' => $data->get(),
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
        LaporanNilai::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(LaporanNilai $laporanNilai)
    {
        $this->pass("show laporanNilai");

        return Inertia::render('LaporanNilai/show', [
            'laporanNilai' => $laporanNilai,
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LaporanNilai $laporanNilai)
    {
        $this->pass("delete laporanNilai");

        $laporanNilai->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateLaporanNilaiRequest $request)
    {
        $this->pass("update laporanNilai");

        $data = $request->validated();
        LaporanNilai::whereIn('id', $data['laporanNilai_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteLaporanNilaiRequest $request)
    {
        $this->pass("delete laporanNilai");

        $data = $request->validated();
        LaporanNilai::whereIn('id', $data['laporanNilai_ids'])->delete();
    }

    
    
    
}
