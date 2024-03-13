import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Valida o retorno do procuraPoke com sucesso', () => {
  //   const component: HomeComponent = TestBed.get(HomeComponent);
  //   const dummyPoke = { id: 1, nome: 'Pikachu', altura: '7', peso: '60' };
  
  //   spyOn(component, 'procuraPoke').and.returnValue(of(dummyPoke));
  
  //   component.procuraPoke();
  //   expect(component.pokeIdEncontrado).toEqual(dummyPoke.id);
  //   expect(component.pokeNomeEncontrado).toEqual(dummyPoke.nome);
  //   expect(component.pokeAlturaEncontrado).toEqual(dummyPoke.altura);
  //   expect(component.pokePesoEncontrado).toEqual(dummyPoke.peso);
  //   expect(component.procurandoPoke).toBeTrue();
  //   expect(component.msgPokeNaoEncontrado).toEqual('');
  // });
});
