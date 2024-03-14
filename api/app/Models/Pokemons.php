<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokemons extends Model
{
    use HasFactory;

    protected $table = 'pokemons';
    public $timestamps = false;

    protected $fillable = [
        'poke_id',
        'poke_nome',
        'poke_altura',
        'poke_peso',
        'poke_descricao',
        'poke_procurado',
    ];
}
