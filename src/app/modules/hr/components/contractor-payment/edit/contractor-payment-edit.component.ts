import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ContractorForPayment, ContractorPayment, ContractorPaymentDetails } from '../definitions/contractor-payment.definition';
import { ContractorPaymentMetadata } from '../contractor-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { SelectionModel } from '@angular/cdk/collections';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-contractor-payment-edit',
  templateUrl: './contractor-payment-edit.component.html',
  styleUrls: ['./contractor-payment-edit.component.css']
})
export class ContractorPaymentEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  billId = 0;
  selection = new SelectionModel<ContractorPaymentDetails>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private dialogRef: MatDialogRef<ContractorPaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ContractorPayment,
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
    
  }

  loadItemDetails() {
    if (this.isEdit) {
      // this.modalForms.issued.model.paymentMode = this.modalForms.issued.model.paymentMode;
      // FormfieldHandler.paymentModeDropdown.templateOptions = this.modalForms.issued.model.paymentMode;
         const endpoint = `${"BuildExeHR/api/ContractorForPayment"}/${this.editData.id}`;

        this.dataHandler.get(endpoint).subscribe((res: any[]) => {
            this.dataSource = new MatTableDataSource(res)

        });
    } else {
        this.dataSource = new MatTableDataSource([]);
    }
}

  ngOnInit(): void {
    this.tableColumns = ContractorPaymentMetadata.contractorPaymentDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ContractorPaymentMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ContractorPaymentMetadata.contractorPaymentDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.loadItemDetails();
    this.dataSource = new MatTableDataSource(this.editData.contractorPaymentDetails || []);
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchBankNameSelectOptions();
    this.fetchContractorSelectOptions();
    this.fetchSiteManagerSelectOptions();
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
    if (this.modalForms.issued.form.valid && this.modalForms.usage.form.valid) {
      if(this.modalForms.issued.model.paymentMode == 1){
        this.modalForms.issued.model.paymentMode = "CASH";
      }
      if(this.modalForms.issued.model.paymentMode == 0){
        this.modalForms.issued.model.paymentMode = "BANK";
      }
      // if(this.modalForms.usage.model.paymentMode == 2){
      //   this.modalForms.usage.model.paymentMode = "SITE MANAGER";
      // }
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
  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ContractorPayment> {
    let payload = {
      ...this.modalForms.issued.model,
    contractorPaymentDetails: this.dataSource.data,
   finantialYearId :1,
   billId : this.billId,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ContractorPayment>(ContractorPaymentMetadata.serviceEndPoint, [payload]);
    } else {
      payload.approvedDate = new Date();
      return this.dataHandler.post<ContractorPayment>(ContractorPaymentMetadata.serviceEndPoint, [payload]);
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
  onShowBtnClick() {
    if (this.modalForms.issued.form.valid && this.modalForms.usage.form.valid) {
      this.fetchData();
    }
  }
  
    fetchData() {
   // const dummyCompanyId = 1; const dummyBranchId = 0; 
   const contractor = this.modalForms.issued.model.employeeId;
   const sitemanagerId = this.modalForms.issued.model.paymentModeId;;
   const dummyFinancialyearId = 1;
    this.dataHandler.get<ContractorForPayment[]>(`${"BuildExeHR/api/ContractorForPayment"}/${contractor}/${sitemanagerId}/${dummyFinancialyearId}`)
      .subscribe((res: ContractorForPayment[]) => {
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
      this.modalForms.issued.model['paymentAmount'] = this.modalForms.issued.model['paymentAmount'] + row.payment;
      console.log("usage",this.modalForms.issued.model['paymentAmount']);
      console.log("amount",row.payment);
      // this.discountAmount =this.discountAmount +row.discount;
      row.billId = row.id;
      console.log("idr",row.id);
    } 
    this.modalForms.issued.model = { ...this.modalForms.issued.model };
  }
  onUserInput($event, row, column) {
    row[column] = Number($event.target.value);
  }
  private fetchSiteManagerSelectOptions() {
    this.employeeService.getSiteManager().subscribe((res) => {
      if (res) {
        FormfieldHandler.siteManagerDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }
  private fetchBankNameSelectOptions() {
    this.dataHandler.get<BankAccount[]>(this.bankServiceUrl)
      .subscribe((res: BankAccount[]) => {
        if (res) {
          FormfieldHandler.bankNameDropdown.templateOptions.options = res.map((e: BankAccount) => (
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
  private fetchContractorSelectOptions() {
    this.employeeService.getContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.contractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  // removeStock(rowIndex: number) {
  //   this.dataSource.data.splice(rowIndex, 1)
  //   this.dataSource._updateChangeSubscription();
  // }

  // editStock(rowToEdit: ContractorPaymentDetails) {
  //   this.enableStockEdit = true;
  //   this.modalForms.usage.model = rowToEdit;
  // }

  // onUpdateStockBtnClick() {

  // }

  // onCancelStockUpdateBtnClick() {

  // }

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}