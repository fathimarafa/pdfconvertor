import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractorIndentComponent } from './subcontractor-indent.component';
import { SubcontractorIndentEditComponent } from './subcontractor-indent-edit/subcontractor-indent-edit.component';

@NgModule({
  declarations: [SubcontractorIndentComponent, SubcontractorIndentEditComponent],
  imports: [
    CommonModule

  ]
})
export class SubcontractorIndentModule { }

