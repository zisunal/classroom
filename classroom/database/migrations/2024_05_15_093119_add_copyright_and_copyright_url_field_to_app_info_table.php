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
        Schema::table('app_info', function (Blueprint $table) {
            $table->string('copyright')->nullable();
            $table->string('copyright_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('app_info', function (Blueprint $table) {
            $table->dropColumn('copyright');
            $table->dropColumn('copyright_url');
        });
    }
};
