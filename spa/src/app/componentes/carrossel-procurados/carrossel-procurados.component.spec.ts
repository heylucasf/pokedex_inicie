import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosselProcuradosComponent } from './carrossel-procurados.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

describe('CarrosselProcuradosComponent', () => {
  let component: CarrosselProcuradosComponent;
  let fixture: ComponentFixture<CarrosselProcuradosComponent>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrosselProcuradosComponent, HttpClientModule, RouterModule.forRoot([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselProcuradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)
    spyOn(router, 'navigate').and.resolveTo(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir itemsPerSet para 1 se a largura da janela for <= 600', () => {
  spyOnProperty(window, 'innerWidth').and.returnValue(600);
  component.showSlide(0);
  });

  it('deve definir itemsPerSet para 1 se a largura da janela for <= 900', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(900);
    component.showSlide(0);
  });

  it('deve definir itemsPerSet para 1 se a largura da janela for <= 1200', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    component.showSlide(0);
  });

  it('deve definir itemsPerSet para 1 se a largura da janela for >= 1300', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1300);
    component.showSlide(0);
  });

  it('deve definir currentIndex para 0 se o índice for maior ou igual ao totalSets', () => {
    const totalSets = 5;
    component.showSlide(totalSets);
    expect(component.currentIndex).toEqual(0);
  });

  it('deve chamar showSlide com currentIndex + 0.5 para nextSlide', () => {
    const spy = spyOn(component, 'showSlide');
    component.currentIndex = 1;
    component.nextSlide();
    expect(spy).toHaveBeenCalledWith(1.5);
  });
  
  it('deve chamar showSlide com currentIndex - 0.5 para prevSlide', () => {
    const spy = spyOn(component, 'showSlide');
    component.currentIndex = 1;
    component.prevSlide();
    expect(spy).toHaveBeenCalledWith(0.5);
  });
  
  it('Deve navegar para Detalhes Pokemon', () => {
    const id = 1;
    component.redirectToPoke(id);
    expect(router.navigate).toHaveBeenCalledWith([`/pokemon/${id}`]);
  });
});
