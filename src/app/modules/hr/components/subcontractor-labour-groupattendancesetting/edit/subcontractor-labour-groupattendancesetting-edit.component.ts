import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { AttendanceDetails, SubcontractorlabourgroupaAttendance } from '../definitions/subcontractor-labour-groupattendancesetting.definition';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { SubcontractorlaboutgroupattendanceMetadata } from '../subcontractor-labour-groupattendancesetting.configuration';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order/subcontractor-work-order.configuration';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';


@Component({
  selector: 'app-subcontractor-labour-groupattendancesetting-edit',
  templateUrl: './subcontractor-labour-groupattendancesetting-edit.component.html',
  styleUrls: ['./subcontractor-labour-groupattendancesetting-edit.component.css']
})
export class SubcontractorlabourgroupattendanceEditComponent implements OnInit {

  fields: FormlyFieldConfig[];
  module;
  modalForms;
  model: SubcontractorlabourgroupaAttendance;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorlabourgroupattendanceEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorlabourgroupaAttendance,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {
    this.module = SubcontractorlaboutgroupattendanceMetadata;
    this.tableColumns = SubcontractorlaboutgroupattendanceMetadata.attendanceDetails.tableColumns
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
    this.fetchData();
  }


  private get projectDropdown() {
    return this.fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'projectId')
  }



  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubcontractorlabourgroupaAttendance> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);

  }

  ngOnInit(){
     this.fetchData();
   }

  fetchData() {
    const dummyCompanyId = 4; 
    this.dataHandler.get<AttendanceDetails[]>(`${'BuildExeHR/api/SubContractorAttendanceList'}/${dummyCompanyId}`)
      .subscribe((res: AttendanceDetails[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorlaboutgroupattendanceMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: SubcontractorlaboutgroupattendanceMetadata.attendanceDetails
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.attendanceDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {

    this.fetchSubcontractorSelectOptions();
    this.bindProjectDivisionFields();
    this.fetchWorkOrderSelectOptions();
  }

  onSaveBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
      })

    }
  }


  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable<SubcontractorlabourgroupaAttendance > {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     attendanceDetails: this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubcontractorlabourgroupaAttendance >(SubcontractorlaboutgroupattendanceMetadata.serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubcontractorlabourgroupaAttendance >(SubcontractorlaboutgroupattendanceMetadata.serviceEndPoint, [payload]);
  //   }
  // }

  get httpRequest(): Observable<SubcontractorlabourgroupaAttendance> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.attendanceDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorlabourgroupaAttendance>(SubcontractorlaboutgroupattendanceMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorlabourgroupaAttendance>(SubcontractorlaboutgroupattendanceMetadata.serviceEndPoint, [payload]);
    }
  }


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }


  fetchWorkOrderSelectOptions() {
    const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; const dummySubContractorId = 12;
    const endPoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${dummyUnitId}/${dummyBlockId}/${dummyFloorId}/${dummySubContractorId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
          FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workOrderNo,
              value: e.id
            }
          ));
        }
      });
  }


  fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  private fetchWorkCategorySelectOptions() {
    this.dataHandler.get<BasicWorkCategory[]>(this.workcategoryServiceUrl)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.workcategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  private get workcategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }


  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: AttendanceDetails) {
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
    this.subscribeProjectDivison.unsubscribe();
  }

}