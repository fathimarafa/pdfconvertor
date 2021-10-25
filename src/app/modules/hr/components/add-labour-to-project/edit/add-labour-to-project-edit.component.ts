import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { LaboursInProject, LaboursInProjectDetail, laboursInProjectDetails } from '../definitions/labours-in-project.definition';
import { AddLabourToProjectMetadata } from '../add-labour-to-project.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeRegistrationMetadata } from '../../employee-registration/employee-registration.configuration';
import { IDropdown, IEmployee, IEmployeeCategory } from '../../employee-registration/definitions/employee.definiton';
import { LabourWorkRateSettingMetadata } from '../../labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { PrebudgetWorkType } from 'src/app/modules/prebudget/components/work-type/definitions/work-type.definition';
import { PrebudgetWorkTypeMetadata } from 'src/app/modules/prebudget/components/work-type/work-type.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { ForemanWorkOrderMetadata } from '../../foreman-work-order/foreman-work-order.configuration';
import { ForemanWorkOrder } from '../../foreman-work-order/definitions/foreman-work-order.definition';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-labour-to-project-edit',
  templateUrl: './add-labour-to-project-edit.component.html',
  styleUrls: ['./add-labour-to-project-edit.component.css']
})
export class AddLabourToProjectEditComponent implements OnInit {
  rootUrl: string;
  model3: any = {};

  modalForms;
  isEdit: boolean;
  tableColumns;
  model: LaboursInProject;
  model1: LaboursInProjectDetail;
  model2: laboursInProjectDetails;
  dataSource;
  employeeId;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<LaboursInProjectDetail>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<AddLabourToProjectEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LaboursInProject,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,

    // rootUrl = 'BuildExeHR/api/LaboursInProjectDetail',

  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindFormSelectOptions();

  }
  
  // getData() {
  //   const endPoint = `${this.rootUrl}`;
  //   return this.dataHandler.post<LaboursInProjectDetail[]>(endPoint, {});
  // }
  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<LaboursInProject> = {
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
    this.tableColumns = AddLabourToProjectMetadata.laboursInProjectDetail.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: AddLabourToProjectMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        // fields: ForemanWorkBillMetadata.foremanWorkBillDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.laboursInProjectDetail || []);
  }

  loadItemDetails() {
    if (this.isEdit) {
    const endpoint = `${"BuildExeHR/api/LaboursInProjectDetail"}`;
        // this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          let payload: any = this.model3;
          payload.employeeCategoryId =this.modalForms.issued.model.employeeCategoryId;
          payload.employeeLabourGroupId =this.modalForms.issued.model.employeeLabourGroupId;
          payload.projectId =this.modalForms.issued.model.projectId;
          payload.unitId =this.modalForms.issued.model.unitId;
          payload.blockId =this.modalForms.issued.model.blockId;
          payload.floorId =this.modalForms.issued.model.floorId;
              console.log('model3', this.model3);
              const data = this.model3;
              // { "ModeOfEnquiryId": 1, "FromDate": "2020-01-05", "ToDate": "2020-12-05", "ReminderDate": "2021-01-01", "EnquiryStatusId": 1, "EnquiryForId": 4, "AssignStaffId": 2, "MarketingteamId": 1, "companyId": 1, "branchId": 2 }
              this.dataHandler.post(endpoint, data)
                .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res)
        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
//     const endpoint = `${"BuildExeHR/api/LaboursInProjectDetail"}`;
//     this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
//   let payload: any = this.model3;
// payload.employeeCategoryId =this.modalForms.issued.model.employeeCategoryId;
// payload.employeeLabourGroupId =this.modalForms.issued.model.employeeLabourGroupId;
// payload.projectId =this.modalForms.issued.model.projectId;
// payload.unitId =this.modalForms.issued.model.unitId;
// payload.blockId =this.modalForms.issued.model.blockId;
// payload.floorId =this.modalForms.issued.model.floorId;
//     console.log('model3', this.model3);
//     const data = this.model3;
//     // { "ModeOfEnquiryId": 1, "FromDate": "2020-01-05", "ToDate": "2020-12-05", "ReminderDate": "2021-01-01", "EnquiryStatusId": 1, "EnquiryForId": 4, "AssignStaffId": 2, "MarketingteamId": 1, "companyId": 1, "branchId": 2 }
//     this.dataHandler.post(endpoint, data)
//       .subscribe((res: any[]) => {
//         this.dataSource = new MatTableDataSource(res);
//         this.dataSource.paginator = this.paginator;
//       });
}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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


get httpRequest(): Observable<LaboursInProject> {
  this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  let payload: any = this.modalForms.issued.model
   payload.dateAssigned = new Date();
   this.modalForms.issued.model.employeeId =this.employeeId;
 
  if (this.isEdit) {
   payload.laboursInProjectDetail = this.dataSource.data;

      return this.dataHandler.put<LaboursInProject>(AddLabourToProjectMetadata.serviceEndPoint, [payload]);
  } else {
      // payload.isDeleted = 0;
      // payload.approvedDate = new Date();
   payload.laboursInProjectDetail = this.dataSource.data;

      // this.modalForms.issued.model.approvedDate = new Date();
      // payload.financialYearId = 1;
      
      return this.dataHandler.post<LaboursInProject>(AddLabourToProjectMetadata.serviceEndPoint, [payload]);
  }
}


  get dataColumns() {
      if (this.tableColumns && this.tableColumns.length) {
        const columns = this.tableColumns.map(col => col.field);
        const actionIndex = columns.findIndex((col: string) => col === 'action');
        columns.splice(actionIndex, 1);
        columns.push('select');
        return columns;
    } else {
      return [];
    }
  }

  bindFormSelectOptions() {
    this.bindProjectDivisionFields();
    this.fetchCategorySelectOptions();
    if(this.modalForms.issued.model.blockId == null || this.modalForms.issued.model.unitId == null || this.modalForms.issued.model.floorId == null){
      this.modalForms.issued.model.blockId = 0;
      this.modalForms.issued.model.unitId = 0;
      this.modalForms.issued.model.floorId = 0;
    }
  }
  fetchCategorySelectOptions(){
    const endPoint = `${AddLabourToProjectMetadata.dropdownEndpoints.employeeCategory}`;
    this.dataHandler.get<IEmployeeCategory[]>(endPoint)
      .subscribe((res: IEmployeeCategory[]) => {
        if (res) {
          FormfieldHandler.employeeCategory.templateOptions.options = res.map((e: IEmployeeCategory) => (
            {
              label: e.employeeCategoryName,
              value: e.employeeCategoryId
            }
          ));
          this.fetchLabourGroupSelectOptions();
        }
        const categoryList = FormfieldHandler.employeeCategory.templateOptions.options as IDropdown[];
        if(categoryList.length){
          const generatedList  = categoryList.filter(e => [1,6,7].includes(e.value));
          FormfieldHandler.employeeCategory.templateOptions.options = generatedList;
        }
      });
  }
  fetchLabourGroupSelectOptions() {
    this.dataHandler.get<any[]>('BuildExeHR/api/EmployeeLabourGroup')
    .subscribe((res: any[]) => {
      if (res) {
        FormfieldHandler.employeeGroup.templateOptions.options = res.map((e: any) => (
          {
            label: e.employeeLabourGroupName,
            value: e.employeeLabourGroupId
          }
        ));
      }
    });
    }
  onShowBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.fetchData();
    }
  }
  fetchData() {
    const endpoint = `${"BuildExeHR/api/LaboursInProjectDetail"}`;
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  let payload: any = this.model3;
payload.employeeCategoryId =this.modalForms.issued.model.employeeCategoryId;
payload.employeeLabourGroupId =this.modalForms.issued.model.employeeLabourGroupId;
payload.projectId =this.modalForms.issued.model.projectId;
payload.unitId =this.modalForms.issued.model.unitId;
payload.blockId =this.modalForms.issued.model.blockId;
payload.floorId =this.modalForms.issued.model.floorId;
    console.log('model3', this.model3);
    const data = this.model3;
    // { "ModeOfEnquiryId": 1, "FromDate": "2020-01-05", "ToDate": "2020-12-05", "ReminderDate": "2021-01-01", "EnquiryStatusId": 1, "EnquiryForId": 4, "AssignStaffId": 2, "MarketingteamId": 1, "companyId": 1, "branchId": 2 }
    this.dataHandler.post(endpoint, data)
      .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }
  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  onReceiptSelection(event, row) {
    event.stopPropagation();
    row.isSelected = !row.isSelected;
    if (row.isSelected) {
      row.employeeId = row.id;
      console.log("idr",row.id);
    } 
    this.modalForms.issued.model = { ...this.modalForms.issued.model };
  }
  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}