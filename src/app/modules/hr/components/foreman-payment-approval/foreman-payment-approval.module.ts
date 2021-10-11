import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForemanPaymentApprovalComponent } from './foreman-payment-approval.component';
import { ForemanPaymentApprovalEditComponent } from './edit/foreman-payment-approval-edit.component';

@NgModule({
  declarations: [ForemanPaymentApprovalComponent, ForemanPaymentApprovalEditComponent],
  imports: [
    CommonModule
  ]
})
export class ForemanPaymentApprovalModule { }
