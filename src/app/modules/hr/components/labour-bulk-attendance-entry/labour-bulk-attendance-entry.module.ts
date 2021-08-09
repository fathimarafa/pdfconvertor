import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabourBulkAttendanceEntryComponent } from './labour-bulk-attendance-entry.component';
import { LabourBulkAttendanceEntryEditComponent } from './edit/labour-bulk-attendance-entry-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LabourBulkAttendanceEntryComponent,
    LabourBulkAttendanceEntryEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents:[
    LabourBulkAttendanceEntryEditComponent
  ]
})
export class LabourBulkAttendanceEntryModule { }
