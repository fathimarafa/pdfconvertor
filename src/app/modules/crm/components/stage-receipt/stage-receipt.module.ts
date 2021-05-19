import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageReceiptComponent } from './stage-receipt.component';
import { StageReceiptEditComponent } from './edit/stage-receipt-edit.component';



@NgModule({
  declarations: [StageReceiptComponent, StageReceiptEditComponent],
  imports: [
    CommonModule
  ]
})
export class StageReceiptModule { }
