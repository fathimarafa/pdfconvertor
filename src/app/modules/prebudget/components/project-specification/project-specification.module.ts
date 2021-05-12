import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSpecificationComponent } from './project-specification.component';
import { ProjectSpecificationEditComponent } from './edit/project-specification-edit.component';

@NgModule({
  declarations: [ProjectSpecificationComponent, ProjectSpecificationEditComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectSpecificationModule { }
