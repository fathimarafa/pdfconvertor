import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryModeComponent } from './enquiry-mode.component';
import { EnquiryModeEditComponent } from './edit/enquiry-mode-edit.component';



@NgModule({
  declarations: [EnquiryModeComponent, EnquiryModeEditComponent],
  imports: [
    CommonModule
  ]
})
export class EnquiryModeModule { }
