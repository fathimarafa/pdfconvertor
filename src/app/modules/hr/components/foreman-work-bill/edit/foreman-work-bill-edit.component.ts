import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ForemanWorkBill, ForemanWorkBillDetails, ForemanWorkOrderList, workno } from '../definitions/foreman-work-bill.definition';
import { ForemanWorkBillMetadata } from '../foreman-work-bill.configuration';
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
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { ForemanWorkOrderMetadata } from '../../foreman-work-order/foreman-work-order.configuration';
import { ForemanWorkOrder } from '../../foreman-work-order/definitions/foreman-work-order.definition';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foreman-work-bill-edit',
  templateUrl: './foreman-work-bill-edit.component.html',
  styleUrls: ['./foreman-work-bill-edit.component.css']
})
export class ForemanWorkBillEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  model: ForemanWorkBill;
  model1: ForemanWorkBillDetails;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ForemanWorkBillEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanWorkBill,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,


  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
    this.bindFormSelectOptions();

  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ForemanWorkBill> = {
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
    this.tableColumns = ForemanWorkBillMetadata.foremanWorkBillDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ForemanWorkBillMetadata.formFields
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
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.foremanWorkBillDetails || []);
  }

  loadItemDetails() {
    if (this.isEdit) {
        const endpoint = `${"BuildExeHR/api/ForemanWorkOrder"}List/${this.editData.id}`;
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
  }
  openApproveDialog(): void {
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.saveChanges();
        }
    });
}

get isEditedFromApproval() {
    return this.router.url.includes('approval');
}

onSaveBtnClick(nextLevel?: boolean) {
    if (this.modalForms.issued.form.valid) {
        if (this.isEditedFromApproval) {
            this.openApproveDialog();
        } else {
            if (nextLevel) {
                this.modalForms.issued.model.approvedDate = new Date();
                this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
                this.modalForms.issued.model.approvalLevel = 1;
            }
            this.saveChanges();
        }
      }
    }

    saveChanges() {
        this.httpRequest.subscribe((res) => {
            const closeEvent: IDialogEvent = {
                action: this.isEdit ? DialogActions.edit : DialogActions.add,
                data: res || this.modalForms.issued.model
            }
            this.dialogRef.close(closeEvent);
        })
    }

  // onSaveBtnClick() {
  //   if (this.modalForms.issued.form.valid) {
  //     this.httpRequest.subscribe((res) => {
  //       const closeEvent: IDialogEvent = {
  //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //         data: this.modalForms.issued.model
  //       }
  //       this.dialogRef.close(closeEvent);
  //     });
  //   }
  // }

  onCancelBtnClick() {
    this.dialogRef.close();
  }


get httpRequest(): Observable<ForemanWorkBill> {
  this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  let payload: any = this.modalForms.issued.model
  payload.foremanWorkBillDetails = this.dataSource.data;
  // payload.modalForms.issued.model.financialYearId = 1;
  if (this.isEdit) {
      return this.dataHandler.put<ForemanWorkBill>(ForemanWorkBillMetadata.serviceEndPoint, [payload]);
  } else {
      payload.isDeleted = 0;
      payload.approvedDate = new Date();
      // this.modalForms.issued.model.approvedDate = new Date();
      payload.financialYearId = 1;
      return this.dataHandler.post<ForemanWorkBill>(ForemanWorkBillMetadata.serviceEndPoint, [payload]);
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
    this.fetchForemanSelectOptions();
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
    FormfieldHandler.foremanDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.fetchWorkOrderSelectOptions();
      
    }
    FormfieldHandler.ordernoDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      // this.fetchData();
      
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

  private fetchWorkCategorySelectOptions() {
    this.dataHandler.get<BasicWorkCategory[]>(this.workCategoryServiceUrl)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  private get workCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }
  onUserInput($event, row, column) {
    row[column] = Number($event.target.value);
    row['amount'] = row.noOfLabours * row.workRate;
    row['oTAmount'] = row.oTRate * row.oTHours;
    row['total'] = row['amount'] + row['oTAmount'];
    // this.calculateItemDetailsTableTotal();
  }
  WorknoDataset: ForemanWorkOrder[]; 
  BillnoDataset: any[];  

  fetchWorkOrderSelectOptions() {
    const user = this.authService.loggedInUser;
    // const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; 
    // const dummyforemanId = 13;
    const foremanId = this.modalForms.issued.model.foremanId;
    const projectId = this.modalForms.issued.model.projectId;
    const blockId = this.modalForms.issued.model.blockId;
    const unitId = this.modalForms.issued.model.unitId;
    const floorId = this.modalForms.issued.model.floorId;

    const endPoint = `${ForemanWorkBillMetadata.dropdownEndpoints.workno}/${projectId}/${unitId}/${blockId}/${floorId}/${foremanId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
        this.WorknoDataset=res;
          FormfieldHandler.ordernoDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workName,
              value: e.id
            }
          ));
          this.listenworknoChange();
        }
      });
  }
  listenworknoChange() {
    FormfieldHandler.ordernoDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const selectedworkno: ForemanWorkOrder = this.WorknoDataset.find(e => e.id === this.modalForms.issued.model.workOrderMasterId)
      if (selectedworkno) {
        // this.modalForms.issued.model.voucherTypeId= selectedworkno.workTypeId;
        // console.log("", this.modalForms.issued.model.voucherTypeId);
        // this.modalForms.issued.model = { ...this.modalForms.issued.model};
        console.log("workordermasterid",this.modalForms.issued.model['workOrderMasterId']);
        this.fetchData();
        this.fetchWorkBillnoSelectOptions();


      }
    }

  }
  
  fetchWorkBillnoSelectOptions() {
    const user = this.authService.loggedInUser;
    const dummytype = 1; 
    const workid =this.modalForms.issued.model.workOrderMasterId;
    const endPoint = `${'BuildExeHR/api/MaxNo'}/${dummytype}/${workid}/${1}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
        
            this.modalForms.issued.model.billNumber= String(res);
         this.modalForms.issued.model = { ...this.modalForms.issued.model};
        }
      });
  }

  fetchData() {
    const workid = this.modalForms.issued.model.workOrderMasterId;
    
    // console.log("df",this.modalForms.issued.model['workOrderMasterId']);
    this.dataHandler.get<any[]>(`${"BuildExeHR/api/ForemanWorkOrder"}List/${this.modalForms.issued.model['workOrderMasterId']}`)
    .subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}