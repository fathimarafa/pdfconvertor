import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SupplierRegistration } from 'src/app/modules/material/components/supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from 'src/app/modules/material/components/supplier-registration/supplier-registration.configuration';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from 'src/app/modules/hr/components/subcontractorbillpayment/handlers/form-field.handler';
import { EmployeeRegistrationMetadata } from '../../employee-registration/employee-registration.configuration';
import { IEmployee } from '../../employee-registration/definitions/employee.definiton';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
// import {EmployeelistMetadata} from 'src/app/modules/hr/components/employeelist/employeelist.configuration';
// import {EmployeeList} from 'src/app/modules/hr/components/employeelist/definitions/employeelist.definition';
import { SubcontractorBillMetadata } from '../../subcontractor-work-bill/subcontractor-work-bill.configuration';
import { SubcontractorBill } from '../../subcontractor-work-bill/definitions/subcontractor-work-bill.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
import { SubcontractorbillPayment, subcontractorForPayment, SubContractorPaymentDetails } from '../../subcontractorbillpayment/definitions/subcontractor-bill-payment.definition';
import { SubcontractorPaymentMetadata } from '../../subcontractorbillpayment/subcontractorbillpayment.configuration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcontractorbillpaymentEditComponent } from '../../subcontractorbillpayment/edit/subcontractorbillpayment-edit.component';


@Component({
  selector: 'app-subcontractorbillpayment-approval-edit',
  templateUrl: './subcontractorbillpayment-approval-edit.component.html',
  styleUrls: ['./subcontractorbillpayment-approval-edit.component.css']
})
export class SubcontractorbillpaymentapprovalEditComponent implements OnInit {

 


module;
modalForms;
isEdit: boolean;
tableColumns;
dataSource;
// discountAmount =0;
billId = 0;
subscribeProjectDivison: Subscription;
enableStockEdit: boolean;
selection = new SelectionModel<SubContractorPaymentDetails>(true, []);

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

constructor(
  private dialogRef: MatDialogRef<SubcontractorbillpaymentEditComponent>,
  @Inject(MAT_DIALOG_DATA) private editData: SubcontractorbillPayment,
  private dataHandler: DataHandlerService,
  private employeeService: EmployeeService,
  private authService: AuthenticationService,
  private snackBar: MatSnackBar,
  private router: Router,
  private dialog: MatDialog,


  // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
) {
  if (Object.keys(this.editData).length) {
    this.isEdit = true;
  }
  this.module = SubcontractorPaymentMetadata;
  this.tableColumns = this.module.tableColumns
  this.defineModalForms();
  this.loadDropdowns();
  // this.listenQuotationTypeChange();
 
}

loadItemDetails() {
  if (this.isEdit) {
    // this.modalForms.issued.model.paymentMode = this.modalForms.issued.model.paymentMode;
    // FormfieldHandler.paymentModeDropdown.templateOptions = this.modalForms.issued.model.paymentMode;
    const endpoint = `${'BuildExeHR/api/SubContractorForPayment'}/${this.editData.id}`;
      this.dataHandler.get(endpoint).subscribe((res: any[]) => {
          this.dataSource = new MatTableDataSource(res)

      });
  } else {
      this.dataSource = new MatTableDataSource([]);
  }
}

onUserInput($event, row, column) {
  row[column] = Number($event.target.value);
}

fetchData() {
  // const dummyCompanyId = 1; const dummyBranchId = 0; 
  const foremanId = this.modalForms.issued.model.employeeId;
  // const To = this.modalForms.issued.model.dateTo;
  // const Todate = To.toISOString().split('T')[0]
  const sitemanagerId = this.modalForms.issued.model.paymentModeId; const dummyFinancialyearId = 1; 
  this.dataHandler.get<subcontractorForPayment[]>(`${"BuildExeHR/api/SubContractorForPayment"}/${26}/${15}/${dummyFinancialyearId}`)
    .subscribe((res: subcontractorForPayment[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });

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
    this.modalForms.issued.model['am'] = this.modalForms.issued.model['am'] + row.paymentAmount;
    // this.discountAmount =this.discountAmount +row.discount;
    row.billId = row.id;
    console.log("idr",row.id);
  } 
  this.modalForms.issued.model = { ...this.modalForms.issued.model };
}


ngOnInit(): void {
  this.tableColumns = SubcontractorPaymentMetadata.subContractorPaymentDetails.tableColumns;
  // if (this.modalForms.issued.model.paymentModeId === 0) {
  //   FormfieldHandler.paymentModeDropdown.templateOptions.disabled = true;
  
  // }

}

defineModalForms() {
  this.modalForms = {
    issued: {
      form: new FormGroup({}),
      model: this.editData,
      options: {},
      fields: SubcontractorPaymentMetadata.formFields
    },
    usage: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: SubcontractorPaymentMetadata.subContractorPaymentDetails
    }
  }
  const formFields: ModalFormFields = {
    issued: this.modalForms.issued.fields,
    usage: this.modalForms.usage.fields
  }
  FormfieldHandler.initialize(formFields);
  this.loadDropdowns();
  this.loadItemDetails();
  this.dataSource = new MatTableDataSource(this.editData.subContractorPaymentDetails || []);
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

loadDropdowns() {
  this.fetchSiteManagerSelectOptions();
  this.fetchSubcontractorSelectOptions();
  this.fetchBankNameSelectOptions();
}
private fetchBankNameSelectOptions() {
  this.dataHandler.get<BankAccount[]>(this.bankServiceUrl)
    .subscribe((res: BankAccount[]) => {
      if (res) {
        FormfieldHandler.bankaccountnameDropdown.templateOptions.options = res.map((e: BankAccount) => (
          {
            label: e.bankName,
            value: e.id
          }
        ));
      }
    });
}

private get bankServiceUrl() {
  const user = this.authService.loggedInUser;
  return `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
}
private fetchSiteManagerSelectOptions() {
  this.employeeService.getSiteManager().subscribe((res) => {
    if (res) {
      FormfieldHandler.sitemanagerDropdown.templateOptions.options = res.map((e) => (
        {
          label: e.fullName,
          value: e.id
        }
      ));
    }
  });
}

private fetchSubcontractorSelectOptions() {
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


// openApproveDialog(): void {
//   const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
//   dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//           this.saveChanges(isApproved);
//       }
//   });
// }

get isEditedFromApproval() {
  return this.router.url.includes('approval');
}

// onSaveBtnClick(nextLevel?: boolean) {
//   if (this.modalForms.issued.form.valid) {
//     if(this.modalForms.issued.model.paymentMode == 1){
//       this.modalForms.issued.model.paymentMode = "CASH";
//     }
//     if(this.modalForms.issued.model.paymentMode == 0){
//       this.modalForms.issued.model.paymentMode = "BANK";
//     }
//     if(this.modalForms.issued.model.paymentMode == 2){
//       this.modalForms.issued.model.paymentMode = "SITE MANAGER";
//     }
//       if (this.isEditedFromApproval) {
//           this.openApproveDialog();
//       } else {
//           if (nextLevel) {
//               this.modalForms.issued.model.approvedDate = new Date();
//               this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
//               this.modalForms.issued.model.approvalLevel = 1;
//           }
//           this.saveChanges();
//       }
//     }
//   }

  // saveChanges() {
  //     this.httpRequest.subscribe((res) => {
  //         const closeEvent: IDialogEvent = {
  //             action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //             data: res || this.modalForms.issued.model
              
  //         }
  //         this.dialogRef.close(closeEvent);
  //     })
  // }

openApproveRemarkDialog(isApproved: boolean): void {
  const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.saveChanges(isApproved);
      }
  });
}

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
payload.subContractorWorkOrderDetails = this.dataSource.data;
// this.dataHandler.put<SubContractorWorkOrder>(this.module.serviceEndPoint, [payload]).subscribe((res) => {
// this.snackBar.open(`SubContractorWorkOrder ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
    this.dataHandler.put< SubcontractorbillPayment>(this.module.serviceEndPoint, [payload]).subscribe((res) => {
    this.snackBar.open(` SubcontractorbillPayment ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
    this.dialogRef.close();
 
  })
}

onShowBtnClick() {
  // if (this.modalForms.issued.form.valid) {
    this.fetchData();
  // }
}
onCancelBtnClick() {
  this.dialogRef.close();
}

get httpRequest(): Observable<SubcontractorbillPayment> {
  // this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  let payload: any = this.modalForms.issued.model
  payload.foremanPaymentDetails = this.dataSource.data;
  //  payload.modalForms.issued.model.financialYearId = 1;
  this.modalForms.issued.model.finantialYearId =1;
  this.modalForms.issued.model.billId = this.billId;
  if (this.isEdit) {
      return this.dataHandler.put<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
  } else {
      payload.isDeleted = 0;
      payload.approvedDate = new Date();
      // this.modalForms.issued.model.approvedDate = new Date();
      return this.dataHandler.post<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
  }
}
ngOnDestroy() {
  this.modalForms.issued.form.reset();
  this.modalForms.usage.form.reset();
}

}


