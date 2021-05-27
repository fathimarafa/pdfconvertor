import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialStockEntryComponent } from './material-stock-entry.component';
import { MaterialStockEntryEditComponent } from './edit/material-stock-entry-edit.component';



@NgModule({
  declarations: [MaterialStockEntryComponent, MaterialStockEntryEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialStockEntryModule { }
