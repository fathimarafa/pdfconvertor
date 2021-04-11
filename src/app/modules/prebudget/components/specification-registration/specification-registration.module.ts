import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecificationRegistrationComponent } from './specification-registration.component';
import { SpecificationRegistrationEditComponent } from './edit/specification-registration-edit.component';



@NgModule({
  declarations: [SpecificationRegistrationComponent, SpecificationRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class SpecificationRegistrationModule { }
