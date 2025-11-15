<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class LaporanNilai extends Model 
{
    use HasFactory;
    
    

    //protected $table = 'laporan_nilais';

    /*
    protected $fillable = [
        'name',
        'nilai',
        'grade',
        'siswa_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    
}
