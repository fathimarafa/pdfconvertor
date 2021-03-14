import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSupplierAdvanceComponent } from './material-supplier-advance.component';
import { MaterialSupplierAdvanceEditComponent } from './edit/material-supplier-advance-edit.component';

@NgModule({
  declarations: [MaterialSupplierAdvanceComponent, MaterialSupplierAdvanceEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialSupplierAdvanceModule { }
