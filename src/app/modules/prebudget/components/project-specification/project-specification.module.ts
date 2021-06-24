import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSpecificationComponent } from './project-specification.component';
import { ProjectSpecificationEditComponent } from './edit/project-specification-edit.component';
import { ExcelConfigurationModalComponent } from './edit/excel-configuration-modal/excel-configuration-modal.component';

@NgModule({
  declarations: [ProjectSpecificationComponent, ProjectSpecificationEditComponent, ExcelConfigurationModalComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectSpecificationModule { }
