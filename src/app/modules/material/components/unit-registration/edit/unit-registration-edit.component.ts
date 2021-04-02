import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { UnitRegistration } from '../definitions/unit-registration.definition';
import { UnitRegistrationMetadata } from '../unit-registration.configuration';

@Component({
  selector: 'app-unit-registration-edit',
  templateUrl: './unit-registration-edit.component.html',
  styleUrls: ['./unit-registration-edit.component.css']
})
export class UnitRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: UnitRegistration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<UnitRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: UnitRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = UnitRegistrationMetadata.formFields;
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<UnitRegistration> {
    const dummyFields = {
      userId: 1,
      companyId: 1,
      branchId: 1
    };
    if (this.isEdit) {
      // const endPoint = `${UnitRegistrationMetadata.serviceEndPoint}`;
      return this.dataHandler.put<UnitRegistration>(UnitRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<UnitRegistration>(UnitRegistrationMetadata.serviceEndPoint, { ...this.model, ...dummyFields });
    }
  }

}