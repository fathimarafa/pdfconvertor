import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDesignationRegistrationComponent } from './employee-designation-registration.component';

describe('EmployeeDesignationRegistrationComponent', () => {
  let component: EmployeeDesignationRegistrationComponent;
  let fixture: ComponentFixture<EmployeeDesignationRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDesignationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDesignationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
