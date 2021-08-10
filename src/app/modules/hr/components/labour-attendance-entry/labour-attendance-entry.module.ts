import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabourAttendanceEntryComponent } from './labour-attendance-entry.component';
import { LabourAttendanceEntryEditComponent } from './edit/labour-attendance-entry-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LabourAttendanceEntryComponent,
    LabourAttendanceEntryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    LabourAttendanceEntryEditComponent
  ]
})
export class LabourAttendanceEntryModule { }
