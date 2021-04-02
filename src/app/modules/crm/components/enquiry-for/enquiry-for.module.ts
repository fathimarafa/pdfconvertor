import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryForComponent } from './enquiry-for.component';
import { EnquiryForEditComponent } from './edit/enquiry-for-edit.component';

@NgModule({
  declarations: [EnquiryForComponent, EnquiryForEditComponent],
  imports: [
    CommonModule
  ],
  exports: [EnquiryForComponent],
  entryComponents: [EnquiryForEditComponent]
})
export class EnquiryForModule { }
