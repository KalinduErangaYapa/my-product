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
        //nullable the all fields
        Schema::table('bookings', function (Blueprint $table) {
            //product_id foreign key
            $table->foreignId('product_id')->nullable()->change();
            $table->foreignId('device_id')->nullable()->change();
            //price_id foreign key
            $table->foreignId('price_id')->nullable()->change();
            $table->string('customer_name')->nullable()->change();
            $table->string('email')->nullable()->change();
            $table->string('phone_number')->nullable()->change();
            $table->text('message')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
