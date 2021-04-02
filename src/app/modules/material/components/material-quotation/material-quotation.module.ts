import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialQuotationComponent } from './material-quotation.component';
import { MaterialQuotationEditComponent } from './edit/material-quotation-edit.component';



@NgModule({
  declarations: [MaterialQuotationComponent, MaterialQuotationEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialQuotationModule { }
