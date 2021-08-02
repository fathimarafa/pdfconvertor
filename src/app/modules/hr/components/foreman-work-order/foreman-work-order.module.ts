import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForemanWorkOrderComponent } from './foreman-work-order.component';
import { ForemanWorkOrderEditComponent } from './edit/foreman-work-order-edit.component';

@NgModule({
  declarations: [ForemanWorkOrderComponent, ForemanWorkOrderEditComponent],
  imports: [
    CommonModule
  ]
})
export class ForemanWorkOrderModule { }
