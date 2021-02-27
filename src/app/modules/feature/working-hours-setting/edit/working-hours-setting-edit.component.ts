import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { WorkingHoursSettingMetadata } from '../working-hours-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { WorkingHoursSetting } from '../definitions/working-hours-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-working-hours-setting-edit',
  templateUrl: './working-hours-setting-edit.component.html',
  styleUrls: ['./working-hours-setting-edit.component.css']
})
export class WorkingHoursSettingEditComponent implements OnInit {

  form = new FormGroup({});
  model: WorkingHoursSetting;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<WorkingHoursSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: WorkingHoursSetting,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = WorkingHoursSettingMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.workingHoursSettingId = this.model.workingHoursSettingId || Math.round(Math.random() * 100);
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

  get httpRequest(): Observable<WorkingHoursSetting> {
    if (this.isEdit) {
      const endPoint = `${WorkingHoursSettingMetadata.serviceEndPoint}/${this.model.workingHoursSettingId}`;
      return this.dataHandler.put<WorkingHoursSetting>(endPoint, this.model);
    } else {
      return this.dataHandler.post<WorkingHoursSetting>(WorkingHoursSettingMetadata.serviceEndPoint, this.model);
    }
  }

}
