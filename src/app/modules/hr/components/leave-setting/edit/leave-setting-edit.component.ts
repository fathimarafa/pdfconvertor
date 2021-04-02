import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LeaveCreationMetadata } from '../leave-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { LeaveSetting } from '../definitions/leave-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-setting-edit',
  templateUrl: './leave-setting-edit.component.html',
  styleUrls: ['./leave-setting-edit.component.css']
})
export class LeaveSettingEditComponent implements OnInit {
  form = new FormGroup({});
  model: LeaveSetting;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<LeaveSettingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LeaveSetting,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = LeaveCreationMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void {
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.FinancialYearId = this.model.FinancialYearId || Math.round(Math.random() * 100);
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

  get httpRequest(): Observable<LeaveSetting> {
    if (this.isEdit) {
      const endPoint = `${LeaveCreationMetadata.serviceEndPoint}/${this.model.FinancialYearId}`;
      return this.dataHandler.put<LeaveSetting>(endPoint, this.model);
    } else {
      return this.dataHandler.post<LeaveSetting>(LeaveCreationMetadata.serviceEndPoint, this.model);
    }
  }

}
