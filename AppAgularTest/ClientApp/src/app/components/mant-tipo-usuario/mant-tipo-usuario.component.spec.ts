import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantTipoUsuarioComponent } from './mant-tipo-usuario.component';

describe('MantTipoUsuarioComponent', () => {
  let component: MantTipoUsuarioComponent;
  let fixture: ComponentFixture<MantTipoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantTipoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
