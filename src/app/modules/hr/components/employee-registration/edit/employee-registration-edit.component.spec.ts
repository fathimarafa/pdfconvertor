import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegistrationEditComponent } from './employee-registration-edit.component';

describe('EmployeeRegistrationEditComponent', () => {
  let component: EmployeeRegistrationEditComponent;
  let fixture: ComponentFixture<EmployeeRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
