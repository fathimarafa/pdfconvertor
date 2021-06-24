import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateEvaluationComponent } from './rate-evaluation.component';
import { RateEvaluationEditComponent } from './edit/rate-evaluation-edit.component';



@NgModule({
  declarations: [RateEvaluationComponent, RateEvaluationEditComponent],
  imports: [
    CommonModule
  ]
})
export class RateEvaluationModule { }
