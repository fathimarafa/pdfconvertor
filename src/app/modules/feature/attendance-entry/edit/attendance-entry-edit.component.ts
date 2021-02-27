import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AttendanceEntryMetadata } from '../attendance-entry.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { AttendanceEntry } from '../definitions/attendance.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendance-entry-edit',
  templateUrl: './attendance-entry-edit.component.html',
  styleUrls: ['./attendance-entry-edit.component.css']
})
export class AttendanceEntryEditComponent implements OnInit {

  form = new FormGroup({});
  model: AttendanceEntry;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<AttendanceEntryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: AttendanceEntry,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = AttendanceEntryMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<AttendanceEntry> {
    if (this.isEdit) {
      return this.dataHandler.put<AttendanceEntry>(AttendanceEntryMetadata.serviceEndPoint, this.model);
    } else {
      delete this.model.attendanceId;
      return this.dataHandler.post<AttendanceEntry>(AttendanceEntryMetadata.serviceEndPoint, this.model);
    }
  }

}
