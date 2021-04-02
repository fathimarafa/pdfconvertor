import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialIndentCreationComponent } from './material-indent-creation.component';
import { MaterialIndentCreationEditComponent } from './edit/material-indent-creation-edit.component';

@NgModule({
  declarations: [MaterialIndentCreationComponent, MaterialIndentCreationEditComponent],
  imports: [
    CommonModule
  ]
})
export class MaterialIndentCreationModule { }
