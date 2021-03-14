import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamageStockEntryComponent } from './damage-stock-entry.component';
import { DamageStockEntryEditComponent } from './edit/damage-stock-entry-edit.component';

@NgModule({
  declarations: [
    DamageStockEntryComponent,
    DamageStockEntryEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DamageStockEntryModule { }
