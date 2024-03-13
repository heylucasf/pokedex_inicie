import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Valida o retorno do getPokesMaisProcurados', () => {
    const service: ApiService = TestBed.get(ApiService);
    // let id = '1';
    service.getPokesMaisProcurados();
    expect(service.obterTodosPokes).toBeTruthy();
  });

  it('Valida o retorno do getProcurarPoke', () => {
    const service: ApiService = TestBed.get(ApiService);
    let nome = 'nome';
    service.getProcurarPoke(nome);
    expect(service.getProcurarPoke).toBeTruthy();
  });

  it('Valida o retorno do getPokemonById', () => {
    const service: ApiService = TestBed.get(ApiService);
    let id = 1;
    service.getPokemonById(id);
    expect(service.getPokemonById).toBeTruthy();
  });

  it('Valida o retorno do getPokemonByIdentifier', () => {
    const service: ApiService = TestBed.get(ApiService);
    let identifier = '1';
    service.getPokemonByIdentifier(identifier);
    expect(service.getPokemonByIdentifier).toBeTruthy();
  });
  
});
