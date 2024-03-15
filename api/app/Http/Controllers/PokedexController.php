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

    /**
     * @OA\Get(
     *      path="/api/pokedex",
     *      operationId="obterPokemons",
     *      tags={"Pokemons"},
     *      summary="Listar todos Pokemons",
     *      description="Retorna todos os Pokemons",
     *      @OA\Response(
     *          response=200,
     *          description="sucesso",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="poke_id", type="integer", example="1"),
     *                  @OA\Property(property="poke_nome", type="string", example="Bulbasaur"),
     *                  @OA\Property(property="poke_peso", type="number", format="float", example="6.9"),
     *                  @OA\Property(property="poke_altura", type="number", format="float", example="0.7"),
     *                  @OA\Property(property="poke_descricao", type="string", example="There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."),
     *                  @OA\Property(property="poke_procurado", type="integer", example="0")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Nenhum Pokemon encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Nenhum Pokemon encontrado")
     *          )
     *      )
     * )
     */
    public function index() {
        $pokes = collect(range(1, 20))->map(function ($id) {
            if (!Pokemons::where('poke_id', $id)->exists()) {
                $pokesList = $this->getPokemons($id);
                $pokeDesc = $this->getPokemonDesc($id);

                return [
                    'poke_id' => $pokesList['id'],
                    'poke_nome' => $pokesList['name'],
                    'poke_peso' => $pokesList['weight'] / 10.0,
                    'poke_altura' => $pokesList['height'] / 10.0,
                    'poke_descricao' => $pokeDesc,
                    'poke_tipo' => ucfirst($pokesList['types'][0]['type']['name']),
                    'poke_vida' => $pokesList['stats'][0]['base_stat'],
                    'poke_ataque' => $pokesList['stats'][1]['base_stat'],
                    'poke_defesa' => $pokesList['stats'][2]['base_stat'],
                    'poke_velocidade' => $pokesList['stats'][5]['base_stat'],
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
            return response()->json(['message' => 'Nenhum Pokemón encontrado'], 204);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/pokedex/procuraPoke/{pokeNome}",
     *      operationId="searchPokemonByName",
     *      tags={"Pokemons"},
     *      summary="Procurar um Pokemon pelo nome",
     *      description="Retorna o Pokemon informado",
     *      @OA\Parameter(
     *          name="pokeNome",
     *          in="path",
     *          required=true,
     *          description="Nome do Pokemon",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="poke_id", type="integer", example="1"),
     *              @OA\Property(property="poke_nome", type="string", example="Bulbasaur"),
     *              @OA\Property(property="poke_peso", type="number", format="float", example="6.9"),
     *              @OA\Property(property="poke_altura", type="number", format="float", example="0.7"),
     *              @OA\Property(property="poke_descricao", type="string", example="There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."),
     *              @OA\Property(property="poke_procurado", type="integer", example="10")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Pokemon não encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Pokemon não encontrado")
     *          )
     *      )
     * )
     */
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
     * @OA\Get(
     *      path="/api/pokedex/maisProcurados",
     *      operationId="obtemPokemonsMaisProcurados",
     *      tags={"Pokemons"},
     *      summary="Top 10 Pokemons mais procurados",
     *      description="Retorna uma lista dos 10 Pokemons mais procurados.",
     *      @OA\Response(
     *          response=200,
     *          description="sucesso",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(
     *                  @OA\Property(property="poke_id", type="integer", example="1"),
     *                  @OA\Property(property="poke_nome", type="string", example="Bulbasaur"),
     *                  @OA\Property(property="poke_peso", type="number", format="float", example="6.9"),
     *                  @OA\Property(property="poke_altura", type="number", format="float", example="0.7"),
     *                  @OA\Property(property="poke_descricao", type="string", example="There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."),
     *                  @OA\Property(property="poke_procurado", type="integer", example="100")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Nenhum Pokemon encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Nenhum Pokemon encontrado")
     *          )
     *      )
     * )
     */
    public function maisProcurados() {
        $pokes = Pokemons::where('poke_procurado', '>', 0)
            ->orderBy('poke_procurado', 'DESC')
            ->take(10)
            ->get();

        if($pokes) {
            return response()->json($pokes);
        } else {
            return response()->json(['message' => 'Não há nenhum Pokemon no TOP 10'], 204);
        }

    }

    /**
     * @OA\Get(
     *      path="/api/pokedex/{id}",
     *      operationId="getPokemonDetails",
     *      tags={"Pokemons"},
     *      summary="Detalhes do Pokemon",
     *      description="Retorna os detalhes do Pokemon",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID do Pokemon",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="sucesso",
     *          @OA\JsonContent(
     *              @OA\Property(property="id", type="integer", example="1"),
     *              @OA\Property(property="nome", type="string", example="Bulbasaur"),
     *              @OA\Property(property="tipo", type="string", example="Grass"),
     *              @OA\Property(property="vida", type="integer", example="45"),
     *              @OA\Property(property="ataque", type="integer", example="49"),
     *              @OA\Property(property="defesa", type="integer", example="49"),
     *              @OA\Property(property="velocidade", type="integer", example="45"),
     *              @OA\Property(property="peso", type="number", format="float", example="6.9"),
     *              @OA\Property(property="altura", type="number", format="float", example="0.7"),
     *              @OA\Property(property="descricao", type="string", example="There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.")
     *          )
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Pokémon não encontrado",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Pokémon não encontrado")
     *          )
     *      )
     * )
     */
    public function show($param){
        if (is_numeric($param)) {
            $poke_param = Pokemons::where('poke_id', $param)->first();
        } else {
            $poke_param = Pokemons::where('poke_nome', $param)->first();
        }

        if (!$poke_param) {
            return response()->json(['message' => 'Pokemon não encontrado'], 404);
        }

        return response()->json($poke_param);
    }
}
