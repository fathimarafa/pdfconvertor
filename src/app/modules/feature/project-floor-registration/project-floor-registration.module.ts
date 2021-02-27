import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFloorRegistrationComponent } from './project-floor-registration.component';
import { ProjectFloorRegistrationEditComponent } from './edit/project-floor-registration-edit.component';

@NgModule({
  declarations: [ProjectFloorRegistrationComponent, ProjectFloorRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectFloorRegistrationModule { }
