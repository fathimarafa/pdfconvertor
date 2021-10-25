import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorPaymentApprovalComponent } from './contractor-payment-approval.component';
import { ContractorPaymentApprovalEditComponent } from './edit/contractor-payment-approval-edit.component';

@NgModule({
  declarations: [ContractorPaymentApprovalComponent, ContractorPaymentApprovalEditComponent],
  imports: [
    CommonModule
  ]
})
export class ContractorPaymentApprovalModule { }
