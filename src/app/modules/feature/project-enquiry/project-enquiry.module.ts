import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEnquiryComponent } from './project-enquiry.component';
import { ProjectEnquiryEditComponent } from './edit/project-enquiry-edit.component';

@NgModule({
  declarations: [ProjectEnquiryComponent, ProjectEnquiryEditComponent],
  imports: [
    CommonModule
  ],
  exports: [ProjectEnquiryComponent],
  entryComponents: [ProjectEnquiryEditComponent]
})
export class ProjectEnquiryModule { }
