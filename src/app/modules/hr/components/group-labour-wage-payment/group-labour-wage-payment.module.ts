import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupLabourWagePaymentComponent } from './group-labour-wage-payment.component';
import { GroupLabourWagePaymentEditComponent } from './edit/group-labour-wage-payment-edit.component';

@NgModule({
  declarations: [GroupLabourWagePaymentComponent, GroupLabourWagePaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class GroupLabourWagePaymentModule { }
