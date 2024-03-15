import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoDeuErradoComponent } from './algo-deu-errado.component';
import { RouterModule } from '@angular/router';

describe('AlgoDeuErradoComponent', () => {
  let component: AlgoDeuErradoComponent;
  let fixture: ComponentFixture<AlgoDeuErradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoDeuErradoComponent, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlgoDeuErradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
