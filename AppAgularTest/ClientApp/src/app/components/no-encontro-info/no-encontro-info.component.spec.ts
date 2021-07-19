import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEncontroInfoComponent } from './no-encontro-info.component';

describe('NoEncontroInfoComponent', () => {
  let component: NoEncontroInfoComponent;
  let fixture: ComponentFixture<NoEncontroInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoEncontroInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEncontroInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
