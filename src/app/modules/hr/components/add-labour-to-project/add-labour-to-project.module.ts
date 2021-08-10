import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLabourToProjectComponent } from './add-labour-to-project.component';
import { AddLabourToProjectEditComponent } from './edit/add-labour-to-project-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddLabourToProjectComponent,
    AddLabourToProjectEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    AddLabourToProjectEditComponent
  ]
})
export class AddLabourToProjectModule { }
