import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { PrebudgetWorkType } from '../definitions/work-type.definition';
import { PrebudgetWorkTypeMetadata } from '../work-type.configuration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-type-edit',
  templateUrl: './work-type-edit.component.html',
  styleUrls: ['./work-type-edit.component.css']
})
export class WorkTypeEditComponent implements OnInit {

  form = new FormGroup({});
  model: PrebudgetWorkType;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<WorkTypeEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: PrebudgetWorkType,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = PrebudgetWorkTypeMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<PrebudgetWorkType> {
    if (this.isEdit) {
      return this.dataHandler.put<PrebudgetWorkType>(PrebudgetWorkTypeMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<PrebudgetWorkType>(PrebudgetWorkTypeMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}