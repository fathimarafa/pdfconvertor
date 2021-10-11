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
import { SubContractorWorkOrder } from '../../subcontractor-work-order/definitions/subcontractor-work-order.definition';


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
    // this.fetchData();
    this.bindFormSelectOptions();
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
    //  this.fetchData();
   }

  // fetchData() {
  //   // const dummyCompanyId = 4; 
  //   // this.dataHandler.get<AttendanceDetails[]>(`${'BuildExeHR/api/SubContractorAttendanceSetting'}/${this.modalForms.issued.model.projectId}/${this.modalForms.issued.model.unitId}/${this.modalForms.issued.model.blockId}/${this.modalForms.issued.model.floorId}/${this.modalForms.issued.model.subContractorId}`)
  //   this.dataHandler.get<AttendanceDetails[]>(`${'BuildExeHR/api/SubContractorAttendanceSetting'}/${1009}/${17}/${4}/${2}/${12}`)
  //     .subscribe((res: AttendanceDetails[]) => {
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }

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
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.attendanceDetails || []);
  }


  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${"BuildExeHR/api/SubContractorAttendanceSetting"}List/${this.editData.id}`;
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

    // this.fetchSubcontractorSelectOptions();
    // this.bindProjectDivisionFields();
    // this.fetchWorkOrderSelectOptions();
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

  bindFormSelectOptions() {
    this.fetchSubcontractorSelectOptions();
    this.bindProjectDivisionFields();
    if(this.modalForms.issued.model.blockId == null || this.modalForms.issued.model.unitId == null || this.modalForms.issued.model.floorId == null){
      this.modalForms.issued.model.blockId = 0;
      this.modalForms.issued.model.unitId = 0;
      this.modalForms.issued.model.floorId = 0;
    }
    FormfieldHandler.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      // this.modalForms.issued.form.reset();
      this.fetchWorkOrderSelectOptions();
    }
    FormfieldHandler.subcontractorDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkOrderSelectOptions();
      
    }
    FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      // this.fetchData();
      this.fetchWorkBillnoSelectOptions();
      
    }
  }

  // private fetchsubcontractorSelectOptions() {
  //   this.employeeService.getForeman().subscribe((res) => {
  //     if (res) {
  //       FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
  //         {
  //           label: e.fullName,
  //           value: e.id
  //         }
  //       ));
 
  //     }
  //   });
  // }

  // private fetchWorkCategorySelectOptions() {
  //   this.dataHandler.get<BasicWorkCategory[]>(this.workCategoryServiceUrl)
  //     .subscribe((res: BasicWorkCategory[]) => {
  //       if (res) {
  //         FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
  //           {
  //             label: e.workCategoryName,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }

  private get workCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }
  onUserInput($event, row, column) {
    row[column] = $event.target.value;
    row['amount'] = row.noOfLabours * row.workRate;
    row['oTAmount'] = row.oTRate * row.oTHours;
    row['total'] = row['amount'] + row['oTAmount'];
    // this.calculateItemDetailsTableTotal();
  }

  WorknoDataset: SubContractorWorkOrder[]; 
  BillnoDataset: any[];  

  fetchWorkOrderSelectOptions() {
    const user = this.authService.loggedInUser;
    // const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
    // const dummyforemanId = 13;
    const subContractorId = this.modalForms.issued.model.subId;
    const projectId = this.modalForms.issued.model.projectId;
    const blockId = this.modalForms.issued.model.blockId;
    const unitId = this.modalForms.issued.model.unitId;
    const floorId = this.modalForms.issued.model.floorId;
    const endPoint = `${SubcontractorlaboutgroupattendanceMetadata.dropdownEndpoints.workno}/${projectId}/${unitId}/${blockId}/${floorId}/${subContractorId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
        this.WorknoDataset=res;
          FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workOrderNo,
              value: e.id
            }
          ));
          // this.listenworknoChange();
        // console.log("", this.modalForms.issued.model.id);
        // this.fetchWorkBillnoSelectOptions()
        }
      });
  }

  
  // listenworknoChange() {
  //   FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
  //     const selectedworkno: SubContractorWorkOrder = this.WorknoDataset.find(e => e.id === this.modalForms.issued.model.workOrderMasterId)
  //     if (selectedworkno) {
  //       // this.modalForms.issued.model.voucherTypeId= selectedworkno.workTypeId;
  //       console.log("", this.modalForms.issued.model.voucherTypeId);
  //       this.modalForms.issued.model = { ...this.modalForms.issued.model};
  //       console.log("",this.modalForms.issued.model['workOrderMasterId']);
  //     }
  //   }
  // }

  fetchWorkBillnoSelectOptions() {
    const user = this.authService.loggedInUser;
    const dummytype = 1; 
    console.log("wid",this.modalForms.issued.model.workOrderMasterId);
    const endPoint = `${'BuildExeHR/api/MaxNo'}/${dummytype}/${this.modalForms.issued.model.workOrderMasterId}/${1}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
          this.modalForms.issued.model['billno']=String(res);
          console.log("bill",this.modalForms.issued.model.billno);
          this.modalForms.issued.model = { ...this.modalForms.issued.model};
        }
      });
    }

    // FormfieldHandler.workorderDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
    //   const selectedbillno: any = this.BillnoDataset.find(e => e.id === this.modalForms.issued.model.workOrderMasterId)
    //   if (selectedbillno) {
    //     this.modalForms.issued.model.voucherTypeId= selectedbillno.workTypeId;
    //     console.log("", this.modalForms.issued.model.voucherTypeId);
    //     this.modalForms.issued.model = { ...this.modalForms.issued.model};
    //     console.log("",this.modalForms.issued.model['workOrderMasterId']);
    //   }
    // }
  // }

  
  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0;
    const user = this.authService.loggedInUser;
    this.dataHandler.get<any[]>(`${"BuildExeHR/api/ForemanWorkOrder"}List/${user.companyId}/${user.branchId}`)
    .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
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