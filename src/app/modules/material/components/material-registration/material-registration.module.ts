import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialRegistrationComponent } from './material-registration.component';
import { MaterialRegistrationEditComponent } from './edit/material-registration-edit.component';



@NgModule({
  declarations: [MaterialRegistrationComponent, MaterialRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialRegistrationModule { }
