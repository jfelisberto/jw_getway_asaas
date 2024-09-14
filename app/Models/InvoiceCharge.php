<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceCharge extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'invoice_charge';

    protected $fillable = [
        'charge',
        'payment_method',
        'date_created',
        'people_id',
        'customer',
        'payment_link',
        'value',
        'net_value',
        'status',
        'due_date',
        'original_due_date',
        'payment_date',
        'client_payment_date',
        'installment_number',
        'invoice_number',
        'invoice_url',
        'nosso_numero',
        'bank_slip_url'
    ];
}
