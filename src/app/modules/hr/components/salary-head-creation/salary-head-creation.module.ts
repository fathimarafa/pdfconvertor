import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryHeadCreationComponent } from './salary-head-creation.component';
import { SalaryHeadCreationEditComponent } from './edit/salary-head-creation-edit.component';



@NgModule({
  declarations: [
    SalaryHeadCreationComponent,
    SalaryHeadCreationEditComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    SalaryHeadCreationEditComponent
  ],
  exports: [
    SalaryHeadCreationComponent
  ]
})
export class SalaryHeadCreationModule { }
