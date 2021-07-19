import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaginaComponent } from './form-pagina.component';

describe('FormPaginaComponent', () => {
  let component: FormPaginaComponent;
  let fixture: ComponentFixture<FormPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
