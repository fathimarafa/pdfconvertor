import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForemanWorkBillComponent } from './foreman-work-bill.component';
import { ForemanWorkBillEditComponent } from './edit/foreman-work-bill-edit.component';

@NgModule({
  declarations: [ForemanWorkBillComponent, ForemanWorkBillEditComponent],
  imports: [
    CommonModule
  ]
})
export class ForemanWorkBillModule { }
