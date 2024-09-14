<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PeopleCredit extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'people_credit';

    protected $fillable = [
        'people_id',
        'customer_id',
        'status',
        'creditcard_token',
        'card_holder_name',
        'first_six',
        'last_four',
        'expiration_month',
        'expiration_year',
        'security_code'
    ];
}
