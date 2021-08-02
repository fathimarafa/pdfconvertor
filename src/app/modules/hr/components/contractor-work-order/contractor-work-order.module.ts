import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorWorkOrderComponent } from './contractor-work-order.component';
import { ContractorWorkOrderEditComponent } from './edit/contractor-work-order-edit.component';

@NgModule({
  declarations: [ContractorWorkOrderComponent, ContractorWorkOrderEditComponent],
  imports: [
    CommonModule
  ]
})
export class ContractorWorkOrderModule { }
