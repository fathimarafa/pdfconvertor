import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPurchaseReturnComponent } from './material-purchase-return.component';
import { MaterialPurchaseReturnEditComponent } from './edit/material-purchase-return-edit.component';

@NgModule({
  declarations: [MaterialPurchaseReturnComponent, MaterialPurchaseReturnEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialPurchaseReturnModule { }
