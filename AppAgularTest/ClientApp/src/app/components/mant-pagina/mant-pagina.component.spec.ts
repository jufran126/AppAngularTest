import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPaginaComponent } from './mant-pagina.component';

describe('MantPaginaComponent', () => {
  let component: MantPaginaComponent;
  let fixture: ComponentFixture<MantPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
