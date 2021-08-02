import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForemanPaymentComponent } from './foreman-payment.component';
import { ForemanPaymentEditComponent } from './edit/foreman-payment-edit.component';

@NgModule({
  declarations: [ForemanPaymentComponent, ForemanPaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class ForemanPaymentModule { }
