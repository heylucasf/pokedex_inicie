<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use Tests\TestCase;

class PokedexTest extends TestCase
{
    /** @test */
    public function testIndex()
    {
        $response = $this->get('/api/pokedex');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['poke_id', 'poke_nome', 'poke_peso', 'poke_altura', 'poke_descricao', 'poke_procurado'],
        ]);
        $this->assertCount(20, $response->json());
    }

    /** @test */
    public function testDetalhePoke()
    {
        $mock = new MockHandler([
            new Response(200, [], json_encode([
                "id" => 25,
                "nome"=> "Pikachu",
                "tipo"=> "Electric",
                "vida"=> 35,
                "ataque"=> 55,
                "defesa"=> 40,
                "velocidade"=> 90,
                "peso"=> 6,
                "altura"=> 0.4,
                "descricao"=> "Whenever Pikachu comes across something new,\nit blasts it with a jolt of electricity. If you come across a\nblackened berry, it’s evidence that this Pokémon mistook the\nintensity of its charge."
            ])),
        ]);

        $handler = HandlerStack::create($mock);
        $this->app->instance('guzzle', new \GuzzleHttp\Client(['handler' => $handler]));
        $response = $this->get('/api/pokedex/25');
        $response->assertStatus(200);
        $response->assertJson([
            "id" => 25,
            "nome"=> "Pikachu",
            "tipo"=> "Electric",
            "vida"=> 35,
            "ataque"=> 55,
            "defesa"=> 40,
            "velocidade"=> 90,
            "peso"=> 6,
            "altura"=> 0.4,
            "descricao"=> "Whenever Pikachu comes across something new,\nit blasts it with a jolt of electricity. If you come across a\nblackened berry, it’s evidence that this Pokémon mistook the\nintensity of its charge."
        ]);
    }

    /** @test */
    public function testProcuraPoke()
    {
        $response = $this->get('/api/pokedex/procuraPoke/metapod');
        $response->assertStatus(200);
        $response->assertJson([
            'poke_nome' => 'metapod',
        ]);
    }

    /** @test */
    public function testProcuraPoke404()
    {
        $response = $this->get('/api/pokedex/procuraPoke/algo');
        $response->assertStatus(404);
    }

    /** @test */
    public function testTop10Pokes()
    {
        $response = $this->get('/api/pokedex/maisProcurados');
        $response->assertStatus(200);
    }
}
