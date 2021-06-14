import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUserComponent } from './mant-user.component';

describe('MantUserComponent', () => {
  let component: MantUserComponent;
  let fixture: ComponentFixture<MantUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
