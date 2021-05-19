import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatusComponent } from './project-status.component';
import { ProjectStatusEditComponent } from './edit/project-status-edit.component';

@NgModule({
  declarations: [ProjectStatusComponent, ProjectStatusEditComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectStatusModule { }
