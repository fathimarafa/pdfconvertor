import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubcontractorbillPaymentComponent} from './subcontractorbillpayment.component'
import {SubcontractorbillpaymentEditComponent} from './edit/subcontractorbillpayment-edit.component';




@NgModule({
  declarations: [SubcontractorbillPaymentComponent, SubcontractorbillpaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class SubcontractorbillPaymentComponentModule { }
