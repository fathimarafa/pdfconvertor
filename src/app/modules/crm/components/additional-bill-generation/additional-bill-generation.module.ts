import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalBillGenerationComponent } from './additional-bill-generation.component';
import { AdditionalBillGenerationEditComponent } from './edit/additional-bill-generation-edit.component';



@NgModule({
  declarations: [AdditionalBillGenerationComponent, AdditionalBillGenerationEditComponent],
  imports: [
    CommonModule
  ]
})
export class AdditionalBillGenerationModule { }
