import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDesignationRegistrationComponent } from './employee-designation-registration.component';
import { EmployeeDesignationRegistrationEditComponent } from './edit/employee-designation-registration-edit.component';

@NgModule({
  declarations: [
    EmployeeDesignationRegistrationComponent,
    EmployeeDesignationRegistrationEditComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    EmployeeDesignationRegistrationEditComponent
  ]
})
export class EmployeeDesignationRegistrationModule { }
