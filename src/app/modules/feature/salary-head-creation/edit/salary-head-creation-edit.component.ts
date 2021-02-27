import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { SalaryHeadCreationMetadata } from '../salary-head-creation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { SalaryHeadCreationSetting } from '../definitions/salary-head-creation-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-salary-head-creation-edit',
  templateUrl: './salary-head-creation-edit.component.html',
  styleUrls: ['./salary-head-creation-edit.component.css']
})
export class SalaryHeadCreationEditComponent implements OnInit {
  form = new FormGroup({});
  model: SalaryHeadCreationSetting;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<SalaryHeadCreationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SalaryHeadCreationSetting,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = SalaryHeadCreationMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void {
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.salaryHeadTypeId = this.model.salaryHeadTypeId || Math.round(Math.random() * 100);
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

  get httpRequest(): Observable<SalaryHeadCreationSetting> {
    if (this.isEdit) {
      const endPoint = `${SalaryHeadCreationMetadata.serviceEndPoint}/${this.model.salaryHeadTypeId}`;
      return this.dataHandler.put<SalaryHeadCreationSetting>(endPoint, this.model);
    } else {
      return this.dataHandler.post<SalaryHeadCreationSetting>(SalaryHeadCreationMetadata.serviceEndPoint, this.model);
    }
  }

}
