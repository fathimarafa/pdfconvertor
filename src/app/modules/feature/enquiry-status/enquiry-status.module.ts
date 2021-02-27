import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryStatusEditComponent } from './edit/enquiry-status-edit.component';
import { EnquiryStatusComponent } from './enquiry-status.component';



@NgModule({
  declarations: [EnquiryStatusEditComponent, EnquiryStatusComponent],
  imports: [
    CommonModule
  ]
})
export class EnquiryStatusModule { }
