import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicWorkCategoryComponent } from './basic-work-category.component';
import { WorkCategoryEditComponent } from './edit/work-category-edit.component';

@NgModule({
  declarations: [BasicWorkCategoryComponent, WorkCategoryEditComponent],
  imports: [
    CommonModule
  ]
})
export class BasicWorkCategoryModule { }
