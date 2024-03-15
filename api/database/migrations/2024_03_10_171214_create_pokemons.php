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
        Schema::create('pokemons', function (Blueprint $table) {
            $table->id();
            $table->integer('poke_id');
            $table->string('poke_nome');
            $table->string('poke_peso');
            $table->string('poke_altura');
            $table->string('poke_tipo');
            $table->integer('poke_vida');
            $table->integer('poke_ataque');
            $table->integer('poke_defesa');
            $table->integer('poke_velocidade');
            $table->string('poke_descricao');
            $table->integer('poke_procurado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokemons');
    }
};
