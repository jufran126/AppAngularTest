import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantProductoComponent } from './mant-producto.component';

describe('MantProductoComponent', () => {
  let component: MantProductoComponent;
  let fixture: ComponentFixture<MantProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
