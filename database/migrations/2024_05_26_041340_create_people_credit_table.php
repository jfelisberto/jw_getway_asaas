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
        Schema::create('people_credit', function (Blueprint $table) {
            $table->id();
            $table->integer('people_id')->nullable()->default(NULL);
            $table->string('customer_id')->nullable()->default(NULL);
            $table->string('status')->nullable()->default('active');
            $table->string('creditcard_token')->nullable()->default(NULL);
            $table->string('card_holder_name')->nullable()->default(NULL);
            $table->string('first_six')->nullable()->default(NULL);
            $table->string('last_four')->nullable()->default(NULL);
            $table->string('expiration_month')->nullable()->default(NULL);
            $table->string('expiration_year')->nullable()->default(NULL);
            $table->string('security_code')->nullable()->default(NULL);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people_credit');
    }
};
