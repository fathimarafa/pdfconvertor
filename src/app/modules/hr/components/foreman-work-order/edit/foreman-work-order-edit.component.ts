import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ForemanWorkOrder, ForemanWorkOrderDetails } from '../definitions/foreman-work-order.definition';
import { ForemanWorkOrderMetadata } from '../foreman-work-order.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeRegistrationMetadata } from '../../employee-registration/employee-registration.configuration';
import { IEmployee } from '../../employee-registration/definitions/employee.definiton';
import { LabourWorkRateSettingMetadata } from '../../labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { PrebudgetWorkType } from 'src/app/modules/prebudget/components/work-type/definitions/work-type.definition';
import { PrebudgetWorkTypeMetadata } from 'src/app/modules/prebudget/components/work-type/work-type.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-foreman-work-order-edit',
  templateUrl: './foreman-work-order-edit.component.html',
  styleUrls: ['./foreman-work-order-edit.component.css']
})
export class ForemanWorkOrderEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  model: ForemanWorkOrder;
  model1: ForemanWorkOrderDetails;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ForemanWorkOrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanWorkOrder,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ForemanWorkOrder> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }


  ngOnInit(): void {
    this.tableColumns = ForemanWorkOrderMetadata.foremanWorkOrderDetails.tableColumns;
   
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ForemanWorkOrderMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ForemanWorkOrderMetadata.foremanWorkOrderDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.foremanWorkOrderDetails || []);
  }

  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${ForemanWorkOrderMetadata.serviceEndPoint}List/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchWorkCategorySelectOptions();
    this.fetchWorkNameSelectOptions();
    this.fetchForemanSelectOptions();
    this.bindProjectDivisionFields();
  }

  onSaveBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  
  get httpRequest(): Observable<ForemanWorkOrder> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.foremanWorkOrderDetails = this.dataSource.data;
    if (this.isEdit) {
        return this.dataHandler.put<ForemanWorkOrder>(ForemanWorkOrderMetadata.serviceEndPoint, [payload]);
    } else {
        payload.isDeleted = 0;
        return this.dataHandler.post<ForemanWorkOrder>(ForemanWorkOrderMetadata.serviceEndPoint, [payload]);
    }
}


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  private fetchForemanSelectOptions() {
    this.employeeService.getForeman().subscribe((res) => {
      if (res) {
        FormfieldHandler.foremanDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  fetchWorkCategorySelectOptions() {
    this.dataHandler.get<PrebudgetWorkType[]>(this.workcategorySerivceUrl)
      .subscribe((res: PrebudgetWorkType[]) => {
        if (res) {
          FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: PrebudgetWorkType) => (
            {
              label: e.workTypeName,
              value: e.id
            }
          ));
        }
      });
  }

  private get workcategorySerivceUrl() {
    const user = this.authService.loggedInUser;
    return `${PrebudgetWorkTypeMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  onAddStockBtnClick() {
    if (this.isValid) {
      const data: any = Object.assign({}, this.modalForms.usage.model);
      data.labourWorkName = this.WorknameDataset.find(e => e.id === data.labourWorkId).labourWorkName;
      this.dataSource.data.push(data);
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }

  get isValid() {
    if (!this.modalForms.usage.model['labourWorkId']) {
      this.snackBar.open('Warning : Please select WorkName', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    if (!this.modalForms.usage.model['workRate']) {
      this.snackBar.open('Warning : Please input Workrate', null, { panelClass: 'snackbar-error-message' });
      return false;
    }
    return true;
  }


  // fetchWorkNameSelectOptions() {
  //   this.dataHandler.get<LabourWorkRate[]>(this.labourWorkrateSerivceUrl)
  //     .subscribe((res: LabourWorkRate[]) => {
  //       if (res) {
  //         FormfieldHandler.nameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
  //           {
  //             label: e.labourWorkName,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }


  WorknameDataset: LabourWorkRate[];
  private fetchWorkNameSelectOptions() {
    this.dataHandler.get<LabourWorkRate[]>(this.labourWorkrateSerivceUrl).subscribe((res: LabourWorkRate[]) => {
      if (res) {
        this.WorknameDataset=res;
                FormfieldHandler.nameDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
                  {
                   label: e.labourWorkName,
                   value: e.id
                  }
              ));
        this.listenworknameChange();
      }
    });
  }

  listenworknameChange() {
    FormfieldHandler.nameDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const selectedworkname: LabourWorkRate = this.WorknameDataset.find(e => e.id === this.modalForms.usage.model.labourWorkId)
      if (selectedworkname) {
        this.modalForms.usage.model.workRate= selectedworkname.rate;
        this.modalForms.usage.model = { ...this.modalForms.usage.model};
        console.log("",this.modalForms.usage.model['workRate']);
      }
    }

  }

  private get labourWorkrateSerivceUrl() {
    const user = this.authService.loggedInUser;
    return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: ForemanWorkOrderDetails) {
    this.enableStockEdit = true;
    this.modalForms.usage.model = rowToEdit;
  }

  onUpdateStockBtnClick() {

  }

  onCancelStockUpdateBtnClick() {

  }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}