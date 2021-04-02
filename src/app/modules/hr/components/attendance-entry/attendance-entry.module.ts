import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryEditComponent } from './edit/attendance-entry-edit.component';

@NgModule({
  declarations: [
    AttendanceEntryComponent,
    AttendanceEntryEditComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents:[
    AttendanceEntryEditComponent
  ]
})
export class AttendanceEntryModule { }
