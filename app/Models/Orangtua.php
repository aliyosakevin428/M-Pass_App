<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Orangtua extends Model
{
    use HasFactory;



    //protected $table = 'orangtuas';

    /*
    protected $fillable = [
        'name',
        'no_telpon',
        'siswa_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

}
