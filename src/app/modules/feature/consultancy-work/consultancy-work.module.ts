import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultancyWorkComponent } from './consultancy-work.component';
import { ConsultancyWorkEditComponent } from './edit/consultancy-work-edit.component';

@NgModule({
  declarations: [ConsultancyWorkComponent, ConsultancyWorkEditComponent],
  imports: [
    CommonModule
  ]
})
export class ConsultancyWorkModule { }
