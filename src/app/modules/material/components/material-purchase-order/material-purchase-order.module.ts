import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPurchaseOrderComponent } from './material-purchase-order.component';
import { MaterialPurchaseOrderEditComponent } from './edit/material-purchase-order-edit/material-purchase-order-edit.component';
import { SelectIndentComponent } from './edit/select-indent/select-indent.component';



@NgModule({
  declarations: [MaterialPurchaseOrderComponent, MaterialPurchaseOrderEditComponent, SelectIndentComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialPurchaseOrderModule { }
