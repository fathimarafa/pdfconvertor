import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComparisonComponent } from './rate-comparison.component';
import { RateComparisonEditComponent } from './edit/rate-comparison-edit.component';



@NgModule({
  declarations: [RateComparisonComponent, RateComparisonEditComponent],
  imports: [
    CommonModule
  ]
})
export class RateComparisonModule { }
