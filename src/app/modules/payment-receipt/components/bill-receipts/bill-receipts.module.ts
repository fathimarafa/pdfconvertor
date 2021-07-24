import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillReceiptsComponent } from './bill-receipts.component';
import { BillReceiptsEditComponent } from './edit/bill-receipts-edit.component';

@NgModule({
  declarations: [BillReceiptsComponent, BillReceiptsEditComponent],
  imports: [
    CommonModule
  ]
})
export class BillReceiptsModule { }
