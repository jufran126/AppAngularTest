import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoPersonaComponent } from './filtrado-persona.component';

describe('FiltradoPersonaComponent', () => {
  let component: FiltradoPersonaComponent;
  let fixture: ComponentFixture<FiltradoPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltradoPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltradoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
