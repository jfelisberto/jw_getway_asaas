<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_charge', function (Blueprint $table) {
            $table->id();
            $table->string('charge')->nullable()->default(NULL);
            $table->string('payment_method')->nullable()->default(NULL);
            $table->date('date_created')->nullable()->default(NULL);
            $table->string('people_id')->nullable()->default(NULL);
            $table->string('customer')->nullable()->default(NULL);
            $table->string('payment_link')->nullable()->default(NULL);
            $table->string('value')->nullable()->default(NULL);
            $table->string('net_value')->nullable()->default(NULL);
            $table->string('status')->nullable()->default(NULL);
            $table->date('due_date')->nullable()->default(NULL);
            $table->date('original_due_date')->nullable()->default(NULL);
            $table->date('payment_date')->nullable()->default(NULL);
            $table->date('client_payment_date')->nullable()->default(NULL);
            $table->string('installment_number')->nullable()->default(NULL);
            $table->string('invoice_number')->nullable()->default(NULL);
            $table->longText('invoice_url')->nullable()->default(NULL);
            $table->string('nosso_numero')->nullable()->default(NULL);
            $table->longText('bank_slip_url')->nullable()->default(NULL);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_charge');
    }
};
