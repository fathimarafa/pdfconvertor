import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { DepartmentEditComponent } from './edit/department-edit.component';

@NgModule({
  declarations: [DepartmentComponent, DepartmentEditComponent],
  imports: [
    CommonModule
  ]
})
export class DepartmentModule { }
