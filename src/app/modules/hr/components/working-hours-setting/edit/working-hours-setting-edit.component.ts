import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { WorkingHoursSettingMetadata } from '../working-hours-setting.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { WorkingHoursSetting } from '../definitions/working-hours-setting.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeRegistrationMetadata } from '../../employee-registration/employee-registration.configuration';
import { IEmployeeCategory, IEmployeeDesignation } from '../../employee-registration/definitions/employee.definiton';

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
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = WorkingHoursSettingMetadata.formFields;
    this.model = this.editData;
    this.bindFormSelectOptions();
  }

  bindFormSelectOptions(){
    this.fetchCategorySelectOptions();
    this.employeeCategory.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchDesignationSelectOptions();
    }
  }

  get employeeCategory(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.key === 'employeeCategoryId');
  }

  get employeeDesignation(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.key === 'designation_id');
  }

  fetchCategorySelectOptions(){
    const endPoint = `${EmployeeRegistrationMetadata.dropdownEndpoints.employeeCategory}`;
    this.dataHandler.get<IEmployeeCategory[]>(endPoint)
      .subscribe((res: IEmployeeCategory[]) => {
        if (res) {
          this.employeeCategory.templateOptions.options = res.map((e: IEmployeeCategory) => (
            {
              label: e.employeeCategoryName,
              value: e.employeeCategoryId
            }
          ));
        }
      });
  }


  fetchDesignationSelectOptions() {
    const companyId = this.authService.loggedInUser.companyId
    const branchId = this.authService.loggedInUser.branchId;
    const categoryId = this.model.employeeCategoryId;

    const endPoint = `${EmployeeRegistrationMetadata.dropdownEndpoints.employeeDesignation}/${companyId}/${branchId}/${categoryId}`;
    this.dataHandler.get<IEmployeeDesignation[]>(endPoint)
      .subscribe((res: IEmployeeDesignation[]) => {
        if (res) {
          this.employeeDesignation.templateOptions.options = res.map((e: IEmployeeDesignation) => (
            {
              label: e.employeeDesignationName,
              value: e.id
            }
          ));
        }
      });
  }
  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.workingHoursSettingId = this.model.workingHoursSettingId || Math.round(Math.random() * 100);
      this.model.relaxation = Number(this.model.relaxation);
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

  ngOnDestroy() {
    this.form.reset();
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
