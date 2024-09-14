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
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->default(NULL);
            $table->string('username')->nullable()->default(NULL);
            $table->string('email')->nullable()->default(NULL);
            $table->string('docid')->nullable()->default(NULL);
            $table->string('mobile')->nullable()->default(NULL);
            $table->string('same_address')->nullable()->default(NULL);
            $table->string('zipcode')->nullable()->default(NULL);
            $table->string('address')->nullable()->default(NULL);
            $table->string('number')->nullable()->default(NULL);
            $table->string('complement')->nullable()->default(NULL);
            $table->string('district')->nullable()->default(NULL);
            $table->string('city')->nullable()->default(NULL);
            $table->string('state')->nullable()->default(NULL);
            $table->string('country')->nullable()->default(NULL);
            $table->string('customer_id')->nullable()->default(NULL);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
