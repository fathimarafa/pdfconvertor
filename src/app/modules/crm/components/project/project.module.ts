import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectEditComponent } from './edit/project-edit.component';
import { GovernmentProjectComponent } from './edit/govt-project/govt-project.component';
import { NormalProjectComponent } from './edit/normal-project/normal-project.component';
import { StageWorkComponent } from './edit/stage-work/stage-work.component';



@NgModule({
  declarations: [ProjectComponent, ProjectEditComponent, GovernmentProjectComponent, NormalProjectComponent, StageWorkComponent, ProjectEditComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [ProjectEditComponent],
  exports: [ProjectComponent]
})
export class ProjectModule { }
