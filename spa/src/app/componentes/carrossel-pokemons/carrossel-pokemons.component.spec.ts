import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselPokemonsComponent } from './carrossel-pokemons.component';
import { HttpClientModule } from '@angular/common/http';

describe('CarrosselPokemonsComponent', () => {
  let component: CarrosselPokemonsComponent;
  let fixture: ComponentFixture<CarrosselPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosselPokemonsComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrosselPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve decrementar selectedIndex e definir para o último índice se for menor que 0 em carrosselVoltar', () => {
    component.pokemons = [{}, {}, {}]; // Adicione seus pokemons aqui
    component.selectedIndex = 0;
    component.carrosselVoltar();
    expect(component.selectedIndex).toEqual(component.pokemons.length - 1);
  });
  
  it('deve incrementar selectedIndex e definir para 0 se for maior ou igual ao comprimento de pokemons em carrosselProx', () => {
    component.pokemons = [{}, {}, {}]; // Adicione seus pokemons aqui
    component.selectedIndex = component.pokemons.length - 1;
    component.carrosselProx();
    expect(component.selectedIndex).toEqual(0);
  });
});
