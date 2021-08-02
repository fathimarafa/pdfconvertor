import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabourWagePaymentComponent } from './labour-wage-payment.component';
import { LabourWagePaymentEditComponent } from './edit/labour-wage-payment-edit.component';

@NgModule({
  declarations: [LabourWagePaymentComponent, LabourWagePaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class LabourWagePaymentModule { }
