<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    protected $table = 'movies';
    protected $primaryKey = 'id';
    protected $fillable = ['title', 'description', 'genre', 'sutradara'];
    
    use HasFactory;
}
