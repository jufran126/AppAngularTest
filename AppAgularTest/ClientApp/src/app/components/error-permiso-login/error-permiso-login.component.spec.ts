import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPermisoLoginComponent } from './error-permiso-login.component';

describe('ErrorPermisoLoginComponent', () => {
  let component: ErrorPermisoLoginComponent;
  let fixture: ComponentFixture<ErrorPermisoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPermisoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPermisoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
