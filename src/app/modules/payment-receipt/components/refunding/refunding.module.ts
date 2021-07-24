import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundingComponent } from './refunding.component';
import { RefundingEditComponent } from './edit/refunding-edit.component';

@NgModule({
  declarations: [RefundingComponent, RefundingEditComponent],
  imports: [
    CommonModule
  ]
})
export class RefundingModule { }
