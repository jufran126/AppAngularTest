import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPersonaComponent } from './mant-persona.component';

describe('MantPersonaComponent', () => {
  let component: MantPersonaComponent;
  let fixture: ComponentFixture<MantPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
