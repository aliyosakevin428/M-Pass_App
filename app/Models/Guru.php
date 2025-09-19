<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Guru extends Model 
{
    use HasFactory;
    
    

    //protected $table = 'gurus';

    /*
    protected $fillable = [
        'name',
        'no_telpon',
        'email'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    
}
