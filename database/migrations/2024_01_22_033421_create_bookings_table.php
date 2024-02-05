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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            //product_id foreign key
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            //device_id foreign key
            $table->foreignId('device_id')->constrained('devices')->onDelete('cascade');
            //price_id foreign key
            $table->foreignId('price_id')->constrained('pricings')->onDelete('cascade');
            //customer_name
            $table->string('customer_name');
            //customer_email
            $table->string('email');
            //customer_phone
            $table->string('phone_number');
            //message
            $table->text('message');
            //status
            $table->enum('status', ['draft', 'active', 'solving', 'solved', 'rejected'])->default('active');



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
