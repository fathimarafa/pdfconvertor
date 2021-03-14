import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPurchaseOrderComponent } from './material-purchase-order.component';
import { MaterialPurchaseOrderEditComponent } from './edit/material-purchase-order-edit/material-purchase-order-edit.component';



@NgModule({
  declarations: [MaterialPurchaseOrderComponent, MaterialPurchaseOrderEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialPurchaseOrderModule { }
