import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcontractorWorkOrderEditComponent } from './edit/subcontractor-work-order-edit.component';
import {SubcontractorWorkOrderComponent} from './subcontractor-work-order.component';


@NgModule({
  declarations: [
    SubcontractorWorkOrderComponent,
    SubcontractorWorkOrderEditComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    SubcontractorWorkOrderEditComponent
  ]
})
export class SubcontractorWorkOrderModule { }
