import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPCategoriaComponent } from './buscar-pcategoria.component';

describe('BuscarPCategoriaComponent', () => {
  let component: BuscarPCategoriaComponent;
  let fixture: ComponentFixture<BuscarPCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
