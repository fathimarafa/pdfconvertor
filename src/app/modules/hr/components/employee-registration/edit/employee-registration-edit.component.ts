import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EmployeeRegistrationMetadata } from '../employee-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDropdown, IEmployee, IEmployeeCategory, IEmployeeDesignation } from '../definitions/employee.definiton';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../../../../../services/auth-service/authentication.service";

@Component({
  selector: 'app-employee-registration-edit',
  templateUrl: './employee-registration-edit.component.html',
  styleUrls: ['./employee-registration-edit.component.css']
})
export class EmployeeRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: IEmployee;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  employeeList: IEmployee[];

  constructor(
    private dialogRef: MatDialogRef<EmployeeRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IEmployee,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }

    this.fields = EmployeeRegistrationMetadata.formFields;
    this.model = this.editData;
    this.bindFormSelectOptions();
  }

  ngOnInit(): void { }


  get employeeCategory(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'employeerrow1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'employeeCategoryId');
  }

  get employeeDesignation(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'employeerrow1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'employeeDesignationId');
  }
  get labourGroup(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'employeerrow1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'employeeLabourGroupId');
  }
  get labourHeadList(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'employeerrow1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'labourHead');
  }

  bindFormSelectOptions() {
    this.fetchCategorySelectOptions();
    this.employeeCategory.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchDesignationSelectOptions();
    }
    this.fetchFullEmployeeList()
    this.labourGroup.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchLabourHeadSelectOptions()
    }
  }

  fetchFullEmployeeList() {
    const companyId = this.authService.loggedInUser.companyId
    const branchId = this.authService.loggedInUser.branchId;

    const endPoint = `${EmployeeRegistrationMetadata.serviceEndPoint}/${companyId}/${branchId}`;

    this.dataHandler.get<IEmployee[]>(endPoint).subscribe((res: IEmployee[]) => {
        if (res && res.length) {
        this.employeeList = res;
      }
    });
  }

  fetchCategorySelectOptions() {
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

          this.fetchLabourGroupSelectOptions();
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

  fetchLabourGroupSelectOptions() {
    const categoryList = this.employeeCategory.templateOptions.options as IDropdown[];
    if(categoryList.length){
      const generatedList  = categoryList.filter(e => [1,2,3,4].includes(e.value));
      this.labourGroup.templateOptions.options = generatedList;
    }
  }

  fetchLabourHeadSelectOptions() {

    const filteredList = this.employeeList.filter(e => e.employeeLabourGroupId == this.model.employeeLabourGroupId);
    this.labourHeadList.templateOptions.options = filteredList.map((e: IEmployee) => (
      {
        label: e.fullName,
        value: e.id
      }
    ))
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.id = this.model.id || Math.round(Math.random() * 100);
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

  get httpRequest(): Observable<IEmployee> {
    if (this.isEdit) {
      const endPoint = `${EmployeeRegistrationMetadata.serviceEndPoint}/${this.model.id}`;
      return this.dataHandler.put<IEmployee>(endPoint, this.model);
    } else {
      return this.dataHandler.post<IEmployee>(EmployeeRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
