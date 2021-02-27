import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EmployeeRegistrationMetadata } from '../employee-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { Employee } from '../definitions/employee.definiton';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-registration-edit',
  templateUrl: './employee-registration-edit.component.html',
  styleUrls: ['./employee-registration-edit.component.css']
})
export class EmployeeRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: Employee;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<EmployeeRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Employee,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = EmployeeRegistrationMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.employeeId = this.model.employeeId || Math.round(Math.random() * 100);
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

  get httpRequest(): Observable<Employee> {
    if (this.isEdit) {
      const endPoint = `${EmployeeRegistrationMetadata.serviceEndPoint}/${this.model.employeeId}`;
      return this.dataHandler.put<Employee>(endPoint, this.model);
    } else {
      return this.dataHandler.post<Employee>(EmployeeRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

}
