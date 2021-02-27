import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveLevelComponent } from './approve-level.component';
import { ApproveLevelEditComponent } from './edit/approve-level-edit.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ApproveLevelComponent,
    ApproveLevelEditComponent
  ],
  entryComponents: [
    ApproveLevelEditComponent
  ],
  imports: [
    CommonModule,
    // MatTableModule
  ],
  exports:[
    ApproveLevelComponent
  ]
})
export class ApproveLevelModule { }
