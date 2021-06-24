import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTypeComponent } from './work-type.component';
import { WorkTypeEditComponent } from './edit/work-type-edit.component';



@NgModule({
  declarations: [WorkTypeComponent, WorkTypeEditComponent],
  imports: [
    CommonModule
  ]
})
export class WorkTypeModule { }
