import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignBlockFloorComponent } from './assign-block-floor.component';
import { AssignBlockFloorEditComponent } from './edit/assign-block-floor-edit.component';



@NgModule({
  declarations: [AssignBlockFloorComponent, AssignBlockFloorEditComponent],
  imports: [
    CommonModule
  ]
})
export class AssignBlockFloorModule { }
