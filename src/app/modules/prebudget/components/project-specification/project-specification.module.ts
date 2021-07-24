import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSpecificationComponent } from './project-specification.component';
import { ProjectSpecificationEditComponent } from './edit/project-specification-edit.component';
import { QuotedamountAlertModalComponent } from './edit/quotedamount-alert-modal/quotedamount-alert-modal.component';

@NgModule({
  declarations: [ProjectSpecificationComponent, ProjectSpecificationEditComponent, QuotedamountAlertModalComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectSpecificationModule { }
