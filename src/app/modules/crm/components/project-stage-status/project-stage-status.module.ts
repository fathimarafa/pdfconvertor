import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStageStatusComponent } from './project-stage-status.component';
import { ProjectStageStatusEditComponent } from './edit/project-stage-status-edit.component';



@NgModule({
  declarations: [ProjectStageStatusComponent, ProjectStageStatusEditComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectStageStatusModule { }
