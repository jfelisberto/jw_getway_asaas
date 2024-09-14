<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiLogs extends Model
{
    use HasFactory;

    protected $table = 'api_logs';

    protected $fillable = [
        'origin_id',
        'origin_type',
        'api_name',
        'response',
        'payload',
        'endpoint',
        'status'
    ];
}
