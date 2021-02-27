import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EmployeeDesignationRegistrationMetadata } from '../employee-designation-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { EmployeeDesignationRegistration } from '../definitions/employee-designation.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-designation-registration-edit',
  templateUrl: './employee-designation-registration-edit.component.html',
  styleUrls: ['./employee-designation-registration-edit.component.css']
})
export class EmployeeDesignationRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: EmployeeDesignationRegistration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<EmployeeDesignationRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: EmployeeDesignationRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = EmployeeDesignationRegistrationMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.employeeDesignationId = this.model.employeeDesignationId || Math.round(Math.random() * 100).toString();
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

  get httpRequest(): Observable<EmployeeDesignationRegistration> {
    if (this.isEdit) {
      return this.dataHandler.put<EmployeeDesignationRegistration>(EmployeeDesignationRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      delete this.model.employeeDesignationId;
      return this.dataHandler.post<EmployeeDesignationRegistration>(EmployeeDesignationRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

}
