import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRegistrationComponent } from './employee-registration.component';
import { EmployeeRegistrationEditComponent } from './edit/employee-registration-edit.component';

@NgModule({
  declarations: [
    EmployeeRegistrationComponent,
    EmployeeRegistrationEditComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    EmployeeRegistrationEditComponent
  ]
})
export class EmployeeRegistrationModule { }
