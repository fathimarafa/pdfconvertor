import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSupplierPaymentComponent } from './material-supplier-payment.component';
import { MaterialSupplierPaymentEditComponent } from './edit/material-supplier-payment-edit.component';



@NgModule({
  declarations: [MaterialSupplierPaymentComponent, MaterialSupplierPaymentEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialSupplierPaymentModule { }
