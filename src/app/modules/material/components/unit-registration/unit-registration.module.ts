import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitRegistrationComponent } from './unit-registration.component';
import { UnitRegistrationEditComponent } from './edit/unit-registration-edit.component';

@NgModule({
  declarations: [UnitRegistrationComponent, UnitRegistrationEditComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    UnitRegistrationEditComponent
  ],
  exports: [
    UnitRegistrationComponent
  ]
})
export class UnitRegistrationModule { }
