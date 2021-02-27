import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCategoryRegistrationComponent } from './material-category-registration.component';
import { MaterialCategoryRegistrationEditComponent } from './edit/material-category-registration-edit.component';

@NgModule({
  declarations: [MaterialCategoryRegistrationComponent, MaterialCategoryRegistrationEditComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    MaterialCategoryRegistrationEditComponent
  ],
  exports: [
    MaterialCategoryRegistrationComponent
  ]
})
export class MaterialCategoryRegistrationModule { }
