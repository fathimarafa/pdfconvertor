import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartBillComponent } from './part-bill.component';
import { PartBillEditComponent } from './edit/part-bill-edit.component';
import { SelectSpecificationComponent } from './edit/select-specification/select-specification.component';



@NgModule({
  declarations: [PartBillComponent, PartBillEditComponent, SelectSpecificationComponent],
  imports: [
    CommonModule
  ]
})
export class PartBillModule { }
