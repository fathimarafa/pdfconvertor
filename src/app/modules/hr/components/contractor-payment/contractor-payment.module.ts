import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorPaymentComponent } from './contractor-payment.component';
import { ContractorPaymentEditComponent } from './edit/contractor-payment-edit.component';

@NgModule({
  declarations: [ContractorPaymentComponent, ContractorPaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class ContractorPaymentModule { }
