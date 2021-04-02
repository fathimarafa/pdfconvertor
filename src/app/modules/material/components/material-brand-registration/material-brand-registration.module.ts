import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialBrandRegistrationComponent } from './material-brand-registration.component';
import { MaterialBrandRegistrationEditComponent } from './edit/material-brand-registration-edit.component';



@NgModule({
  declarations: [MaterialBrandRegistrationComponent, MaterialBrandRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialBrandRegistrationModule { }
