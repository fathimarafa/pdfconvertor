import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForemanWorkBillApprovalComponent } from './foreman-work-bill-approval.component';
import { ForemanWorkBillApprovalEditComponent } from './edit/foreman-work-bill-approval-edit.component';

@NgModule({
  declarations: [ForemanWorkBillApprovalComponent, ForemanWorkBillApprovalEditComponent],
  imports: [
    CommonModule
  ]
})
export class ForemanWorkBillApprovalModule { }
