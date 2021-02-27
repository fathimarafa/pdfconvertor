import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBlockRegistrationComponent } from './project-block-registration.component';
import { ProjectBlockRegistrationEditComponent } from './edit/project-block-registration-edit.component';



@NgModule({
  declarations: [ProjectBlockRegistrationComponent, ProjectBlockRegistrationEditComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectBlockRegistrationModule { }
