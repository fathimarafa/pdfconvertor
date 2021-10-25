import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorWorkOrderApprovalComponent } from './contractor-work-order-approval.component';
import { ContractorWorkOrderApprovalEditComponent } from './edit/contractor-work-order-approval-edit.component';

@NgModule({
  declarations: [ContractorWorkOrderApprovalComponent, ContractorWorkOrderApprovalEditComponent],
  imports: [
    CommonModule
  ]
})
export class ContractorWorkOrderApprovalModule { }
