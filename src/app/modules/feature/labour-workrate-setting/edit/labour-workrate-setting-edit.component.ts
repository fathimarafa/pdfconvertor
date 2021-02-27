import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LabourWorkRateSettingMetadata } from '../labour-workrate-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { LabourWorkRate } from '../definitions/labour-workrate-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-labour-workrate-setting-edit',
  templateUrl: './labour-workrate-setting-edit.component.html',
  styleUrls: ['./labour-workrate-setting-edit.component.css']
})
export class LabourWorkrateSettingEditComponent implements OnInit {

  form = new FormGroup({});
  model: LabourWorkRate;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<LabourWorkrateSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LabourWorkRate,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = LabourWorkRateSettingMetadata.formFields;
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

  get httpRequest(): Observable<LabourWorkRate> {
    if (this.isEdit) {
      const endPoint = `${LabourWorkRateSettingMetadata.serviceEndPoint}/${this.model.labourWorkRateId}`;
      return this.dataHandler.put<LabourWorkRate>(endPoint, this.model);
    } else {
      return this.dataHandler.post<LabourWorkRate>(LabourWorkRateSettingMetadata.serviceEndPoint, this.model);
    }
  }

}
