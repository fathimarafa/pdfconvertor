import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRegistrationComponent } from './supplier-registration.component';
import { SupplierRegistrationEditComponent } from './edit/supplier-registration-edit.component';

@NgModule({
  declarations: [
    SupplierRegistrationComponent,
    SupplierRegistrationEditComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    SupplierRegistrationEditComponent
  ]
})
export class SupplierRegistrationModule { }
