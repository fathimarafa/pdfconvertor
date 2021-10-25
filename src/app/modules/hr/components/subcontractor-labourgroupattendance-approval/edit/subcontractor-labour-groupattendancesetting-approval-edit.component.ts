import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order/subcontractor-work-order.configuration';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { SubContractorWorkOrder } from '../../subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
import { AttendanceDetails, SubcontractorlabourgroupaAttendance } from '../../subcontractor-labour-groupattendancesetting/definitions/subcontractor-labour-groupattendancesetting.definition';
import { SubcontractorlaboutgroupattendanceMetadata } from '../../subcontractor-labour-groupattendancesetting/subcontractor-labour-groupattendancesetting.configuration';
import { FormfieldHandler, ModalFormFields } from '../../subcontractor-labour-groupattendancesetting/handlers/form-field.handler';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-subcontractor-labour-groupattendancesetting-approval-edit',
  templateUrl: './subcontractor-labour-groupattendancesetting-approval-edit.component.html',
  styleUrls: ['./subcontractor-labour-groupattendancesetting-approval-edit.component.css']
})
export class SubcontractorlabourgroupattendanceapprovalEditComponent implements OnInit {

  fields: FormlyFieldConfig[];
  module;
  modalForms;
  model: SubcontractorlabourgroupaAttendance;
  isEdit: boolean;
  tableColumns;
  dataSource;
  amount = 0;
  balanceAmount = 0;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  nooflabours: 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorlabourgroupattendanceapprovalEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorlabourgroupaAttendance,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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
        const endpoint = `${"BuildExeHR/api/SubContractorAttendanceList"}/${this.editData.id}`;
        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          res.forEach(e => {
            e['Amount'] = e.noOfLabours * e.wage;
            e['oTAmount'] = e.oTRate * e.oTHours;
            e['total'] = e['Amount'] + e['oTAmount'];
          this.amount = this.amount + e['total'];
      this.balanceAmount = this.balanceAmount + e['total'];
          

          })
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

//   openApproveDialog(): void {
//     const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
//     dialogRef.afterClosed().subscribe(result => {
//         if (result) {
//             this.saveChanges();
//         }
//     });
// }

// get isEditedFromApproval() {
//     return this.router.url.includes('approval');
// }

// onSaveBtnClick(nextLevel?: boolean) {
//   // if (this.modalForms.issued.form.valid) {
//       if (this.isEditedFromApproval) {
//           this.openApproveDialog();
//       } else {
//           if (nextLevel) {
         
//           if(this.modalForms.issued.model.maxlevel===0)
//           {
//               this.modalForms.issued.model.approvalStatus=1;
//               this.modalForms.issued.model.approvedDate = new Date();
//               this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
//               this.modalForms.issued.model.approvalLevel = 1;
//               this.saveChanges(); 
//           }
//           else
//           {
//             this.modalForms.issued.model.approvalStatus=0;
//             this.modalForms.issued.model.approvalLevel=1;
//             this.modalForms.issued.model.approvedDate = new Date();
//             this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
//               this.saveChanges(); 
//           }
        
//           }

//           this.modalForms.issued.model.approvalStatus=0;
//           this.modalForms.issued.model.approvalLevel=0;
//           this.modalForms.issued.model.approvedDate = new Date();
//           this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
//             this.saveChanges(); 
        
//       // }
//   }
// }


//     saveChanges() {
//       console.log("",this.modalForms.issued.model.approvalLevel);
//         this.httpRequest.subscribe((res) => {
//             const closeEvent: IDialogEvent = {
//                 action: this.isEdit ? DialogActions.edit : DialogActions.add,
//                 data: res || this.modalForms.issued.model
//             }
//             this.dialogRef.close(closeEvent);
//         })
//     }


openApproveRemarkDialog(isApproved: boolean): void {
  const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.saveChanges(isApproved);
      }
  });
}

get isEditedFromApproval() {
  return this.router.url.includes('approval');
}

// onSaveBtnClick(nextLevel?: boolean) {
//   if (this.modalForms.issued.form.valid) {
//         if (this.isEditedFromApproval) {
//             this.openApproveDialog();
//         } else {
//             if (nextLevel) {
//                 this.modalForms.issued.model.approvedDate = new Date();
//                 this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
//                 this.modalForms.issued.model.approvalLevel = 1;
//             }
//             this.saveChanges();
//         }
//     }
// }

onApproveBtnClick() {
const isApproved = true;
this.openApproveRemarkDialog(isApproved);
}

onRejectBtnClick() {
const isApproved = false;
this.openApproveRemarkDialog(isApproved);
this.modalForms.issued.model.approvalLevel= this.modalForms.issued.model.approvalLevel-1;
}

saveChanges(isApproved: boolean) {
   
if (isApproved) {
//   this.selectedIndent.approvalLevel++;
//   this.selectedIndent.approvedBy = this.authService.loggedInUser.userId;
//   this.selectedIndent.approvedDate = new Date();
// } else {
//   this.selectedIndent.approvalLevel--;

if(this.modalForms.issued.model.maxlevel > this.modalForms.issued.model.approvalLevel)
{
this.modalForms.issued.model.approvalLevel++;
this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
this.modalForms.issued.model.approvedDate = new Date();
}
else
{
  if(this.modalForms.issued.model.maxlevel < this.modalForms.issued.model.approvalLevel)
    {
      this.modalForms.issued.model.approvalLevel=0;
      // this.modalForms.issued.model.approvalStatus=0;
      this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
      this.modalForms.issued.model.approvedDate = new Date();
    }
}
if(this.modalForms.issued.model.maxlevel===this.modalForms.issued.model.approvalLevel)
{
  this.modalForms.issued.model.approvalStatus=1;
  this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
  this.modalForms.issued.model.approvedDate = new Date();
}

}  

console.log("", this.modalForms.issued.model.approvalLevel);
console.log("", this.modalForms.issued.model.approvalStatus);

// this.modalForm.indent.model.indentDetails = this.itemDatasource.data;
  let payload: any = this.modalForms.issued.model
  payload.attendanceDetails = this.dataSource.data;
  this.dataHandler.put<SubcontractorlabourgroupaAttendance>(this.module.serviceEndPoint, [payload]).subscribe((res) => {
  this.snackBar.open(`SubcontractorlabourgroupaAttendance ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
  this.dialogRef.close();
//   const rowToRemove = this.dataSource.data.findIndex(e => e.id === this.selectedIndent.id);
//   if (rowToRemove !== -1) {
//     this.dataSource.data.splice(rowToRemove, 1);
//     this.dataSource._updateChangeSubscription();
//     this.itemDatasource.data = [];
//     this.itemDatasource._updateChangeSubscription();
//   }
})

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
    let payload: any = this.modalForms.issued.model;
    payload.attendanceDetails = this.dataSource.data;
    payload.approvedDate = new Date();
      payload.financialYearId = 1;
      payload.balanceAmount = this.balanceAmount;
      payload.amount = this.amount;
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
      this.fetchWorkBillnoSelectOptions();
      this.fetchData();
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
    row[column] = Number($event.target.value);
    row['Amount'] = row.noOfLabours * row.wage;
    row['oTAmount'] = row.oTRate * row.oTHours;
    row['total'] = row['Amount'] + row['oTAmount'];
    this.calculateItemDetailsTableTotal();
  }

  calculateItemDetailsTableTotal() {
    this.amount = 0;
    this.balanceAmount =0;
    this.dataSource.data.forEach((row) => {
      this.amount = this.amount + row['total'];
      this.balanceAmount = this.balanceAmount + row['total'];
    });
    // this.calculateNetAmount();
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
          this.modalForms.issued.model['billNumber']=String(res);
          console.log("bill",this.modalForms.issued.model.billno);
          this.modalForms.issued.model = { ...this.modalForms.issued.model};
        }
        // this. fetchData();
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
    const workid = this.modalForms.issued.model.workOrderMasterId;
    
    // console.log("df",this.modalForms.issued.model['workOrderMasterId']);
    this.dataHandler.get<any[]>(`${"BuildExeHR/api/SubContractorAttendanceSettingBill"}/${this.modalForms.issued.model['workOrderMasterId']}`)
    .subscribe((res: any[]) => {
      this.nooflabours = 0;
      res.forEach(e => {
        e['noOfLabours'] = 0;
        e['oTHours'] = 0;
        e['Amount'] = e.noOfLabours * e.wage;
        e['oTAmount'] = e.oTRate * e.oTHours;
        e['total'] = e['Amount'] + e['oTAmount'];
      })

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log("wage",this.dataSource.filteredData[0]);
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