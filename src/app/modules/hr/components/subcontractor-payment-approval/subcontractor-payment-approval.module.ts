import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractorPaymentApprovalComponent } from './subcontractor-payment-approval.component';
import {SubcontractorbillpaymentapprovalEditComponent} from "f:/Roshni/Buildexe12.10.21/BuildExe_UI/src/app/modules/hr/components/subcontractor-payment-approval/edit/subcontractorbillpayment-approval-edit.component"

@NgModule({
  declarations: [
    SubcontractorPaymentApprovalComponent,SubcontractorbillpaymentapprovalEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubcontractorWorkBillModule { }
