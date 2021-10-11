import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubContractorIndentApprovalnewComponent } from './subcontractorindent-approval-new.component';
import { SubcontractorIndentApprovalEditComponent } from './subcontractor-indent-approval-edit/subcontractor-indent-approval-edit.component';

@NgModule({
  declarations: [SubContractorIndentApprovalnewComponent,SubcontractorIndentApprovalEditComponent],
  imports: [
    CommonModule
  ]
})
export class SubContractorIndentApprovalModule { }
