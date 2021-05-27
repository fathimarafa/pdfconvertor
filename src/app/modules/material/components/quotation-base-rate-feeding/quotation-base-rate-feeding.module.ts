import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationBaseRateFeedingComponent } from './quotation-base-rate-feeding.component';
import { QuotationBaseRateFeedingEditComponent } from './edit/quotation-base-rate-feeding-edit.component';



@NgModule({
  declarations: [QuotationBaseRateFeedingComponent, QuotationBaseRateFeedingEditComponent],
  imports: [
    CommonModule
  ]
})
export class QuotationBaseRateFeedingModule { }
