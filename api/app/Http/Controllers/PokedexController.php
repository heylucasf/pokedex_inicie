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
        $pokes = collect(range(1, 20))
            ->map(function ($id) {
                $pokesList = $this->getPokemons($id);

                return [
                    'id' => $pokesList['id'],
                    'nome' => ucfirst($pokesList['name']),
                    'peso' => $pokesList['weight'] / 10.0,
                    'altura' => $pokesList['height'] / 10.0
                ];
        });

        if($pokes) {
            return response()->json($pokes);
        } else {
            return response()->json(['message' => 'Erro ao carregar pokemons'], 404);
        }
    }

    public function maisProcurados() {
        $pokes = Pokemons::orderBy('poke_procurado', 'DESC')->get();
        return response()->json($pokes);
    }

    public function procuraPoke($pokeNome) {
        $poke = $this->getPokemons($pokeNome);

        if ($poke) {
            $pokeDB = Pokemons::where('poke_nome', $poke['name'])->first();

            if (!$pokeDB) {
                $pokeDB = new Pokemons;
                $pokeDB->poke_id = $poke['id'];
                $pokeDB->poke_nome = ucfirst($poke['name']);
                $pokeDB->poke_peso = $poke['weight'] / 10.0;
                $pokeDB->poke_altura = $poke['height'] / 10.0;
                $pokeDB->poke_procurado = 1;
            } else {
                $pokeDB->poke_procurado++;
            }

            $pokeDB->save();

            return [
                'id' => $poke['id'],
                'nome' => ucfirst($poke['name']),
                'peso' => $poke['weight'] / 10,
                'altura' => $poke['height'] / 10.0,
                'procurado' => $pokeDB->poke_procurado,
            ];
        } else {
            return response()->json(['message' => 'Pokémon não encontrado'], 404);
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
            'nome' => ucfirst($pokes['name']),
            'tipo' => ucfirst($pokes['types'][0]['type']['name']),
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
