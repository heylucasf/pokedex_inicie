<?php

namespace App\Http\Controllers;

use App\Models\Pokemons;
use http\Client;
use Illuminate\Http\Request;

class PokedexController extends Controller {
    private $cliente;

    public function __construct(){
        $this->cliente = new \GuzzleHttp\Client(['base_uri' => 'https://pokeapi.co/api/v2/']);
    }

    private function getPokemons($id){
        $result = $this->cliente->request('GET', "pokemon/{$id}");
        return json_decode($result->getBody(), true);
    }

    private function getPokemonDesc($id){
        $result = $this->cliente->request('GET', "pokemon-species/{$id}");
        $desc = json_decode($result->getBody(), true);
        return $desc['flavor_text_entries'][44]['flavor_text'];
    }

    public function index() {
        $pokes = collect(range(1, 10))->map(function ($id) {
            if (!Pokemons::where('poke_id', $id)->exists()) {
                $pokesList = $this->getPokemons($id);
                $pokeDesc = $this->getPokemonDesc($id);

                return [
                    'poke_id' => $pokesList['id'],
                    'poke_nome' => $pokesList['name'],
                    'poke_peso' => $pokesList['weight'] / 10.0,
                    'poke_altura' => $pokesList['height'] / 10.0,
                    'poke_descricao' => $pokeDesc,
                    'poke_procurado' => 0
                ];
            }
            return null;
        })->filter();

        if (!$pokes->isEmpty()) {
            Pokemons::insert($pokes->toArray());
        }

        if($pokeDB = Pokemons::all()->toArray()) {
            return response()->json($pokeDB);
        } else {
            return response()->json(['message' => 'Nenhum Pokemón encontrado'], 404);
        }
    }

    public function maisProcurados() {
        $pokes = Pokemons::orderBy('poke_procurado', 'DESC')->get();
        return response()->json($pokes);
    }

    public function procuraPoke($pokeNome) {
        $pokeDB = Pokemons::where('poke_nome', $pokeNome)->first();

        if ($pokeDB) {
            $pokeDB->increment('poke_procurado');
            return $pokeDB;
        } else {
            return response()->json(['message' => 'Nome do Pokemón não encontrado'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id){
        $pokes = $this->getPokemons($id);
        $pokesDescricao = $this->getPokemonDesc($id);

        $detalhes = [
            'id' => $pokes['id'],
            'nome' => $pokes['name'],
            'tipo' => $pokes['types'][0]['type']['name'],
            'vida' => $pokes['stats'][0]['base_stat'],
            'ataque' => $pokes['stats'][1]['base_stat'],
            'defesa' => $pokes['stats'][2]['base_stat'],
            'velocidade' => $pokes['stats'][5]['base_stat'],
            'peso' => $pokes['weight'] / 10,
            'altura' => $pokes['height'] / 10.0,
            'descricao' => $pokesDescricao,
        ];

        return $detalhes;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
