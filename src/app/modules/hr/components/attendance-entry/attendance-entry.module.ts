import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceEntryComponent } from './attendance-entry.component';
import { AttendanceEntryEditComponent } from './edit/attendance-entry-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AttendanceEntryComponent,
    AttendanceEntryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    AttendanceEntryEditComponent
  ]
})
export class AttendanceEntryModule { }
