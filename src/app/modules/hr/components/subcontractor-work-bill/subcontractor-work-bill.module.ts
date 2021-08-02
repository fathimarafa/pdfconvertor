import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractorWorkBillEditComponent } from './edit/subcontractor-work-bill-edit.component';
import {SubcontractorWorkBillComponent} from './subcontractor-work-bill.component';


@NgModule({
  declarations: [
    SubcontractorWorkBillComponent,SubcontractorWorkBillEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubcontractorWorkBillModule { }
