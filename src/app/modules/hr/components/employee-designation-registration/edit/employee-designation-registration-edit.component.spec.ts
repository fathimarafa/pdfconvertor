import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDesignationRegistrationEditComponent } from './employee-designation-registration-edit.component';

describe('EmployeeDesignationRegistrationEditComponent', () => {
  let component: EmployeeDesignationRegistrationEditComponent;
  let fixture: ComponentFixture<EmployeeDesignationRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDesignationRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDesignationRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
