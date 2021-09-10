import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EmployeeDesignationRegistrationMetadata } from '../employee-designation-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
// import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../../../../../services/auth-service/authentication.service";
import { EmployeeDesignationRegistration } from '../definitions/employee-designation.definition';
import { IEmployeeCategory } from '../../employee-registration/definitions/employee.definiton';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';

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
  employeeList: EmployeeDesignationRegistration[];
  employeeLabourGroup: any;

  constructor(
    private dialogRef: MatDialogRef<EmployeeDesignationRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: EmployeeDesignationRegistration,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }

    this.fields = EmployeeDesignationRegistrationMetadata.formFields;
    this.model = this.editData;
    this.fetchCategorySelectOptions();
   
  }

  ngOnInit(): void { }


  get employeeCategory(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'employeerrow1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'employeeCategoryId');
  }


  

  fetchFullEmployeeList() {
    const companyId = this.authService.loggedInUser.companyId
    const branchId = this.authService.loggedInUser.branchId;

    const endPoint = `${EmployeeDesignationRegistrationMetadata.serviceEndPoint}/${companyId}/${branchId}`;

    this.dataHandler.get<EmployeeDesignationRegistration[]>(endPoint).subscribe((res: EmployeeDesignationRegistration[]) => {
        if (res && res.length) {
        this.employeeList = res;
      }
    });
  }

  fetchCategorySelectOptions() {
    const endPoint = `${EmployeeDesignationRegistrationMetadata.dropdownEndpoints.employeeCategory}`;
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
 


  onSaveBtnClick() {
    if (this.form.valid) {
        if(this.model.marketing != 0){
          this.model.marketing = 1;
        }
       else{
        this.model.marketing = 0;
       }
    
      //  this.model.id = this.model.id || Math.round(Math.random() * 100);
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
      const endPoint = `${EmployeeDesignationRegistrationMetadata.serviceEndPoint}`;
      return this.dataHandler.put<EmployeeDesignationRegistration>(endPoint, this.model);
    } 
   
    else {
      return this.dataHandler.post<EmployeeDesignationRegistration>(EmployeeDesignationRegistrationMetadata.serviceEndPoint, this.model);
    }
  }
 
  ngOnDestroy() {
    this.form.reset();
  }

}
