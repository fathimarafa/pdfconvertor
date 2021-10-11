import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ForemanForPayment, ForemanPayment, ForemanPaymentDetails } from '../definitions/foreman-payment.definition';
// import { ForemanPaymentMetadata } from '../foreman-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { ForemanPaymentApprovalMetadata } from '../foreman-payment-approval.configuration';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { ForemanPaymentMetadata } from '../../foreman-payment/foreman-payment.configuration';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-foreman-payment-approval-edit',
  templateUrl: './foreman-payment-approval-edit.component.html',
  styleUrls: ['./foreman-payment-approval-edit.component.css']
})
export class ForemanPaymentApprovalEditComponent implements OnInit {
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<ForemanPaymentDetails>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ForemanPaymentApprovalEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanPayment,
    private dataHandler: DataHandlerService,
    private employeeService: EmployeeService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = ForemanPaymentApprovalMetadata;
    this.tableColumns = this.module.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
   
  }

  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0; 
    const foremanId = this.modalForms.issued.model.employeeId;
    const To = this.modalForms.issued.model.dateTo;
    const Todate = To.toISOString().split('T')[0]
    const sitemanagerId = this.modalForms.issued.model.paymentModeId; const dummyFinancialyearId = 1; 
    this.dataHandler.get<ForemanForPayment[]>(`${"BuildExeHR/api/ForemanForPayment"}/${foremanId}/${sitemanagerId}/${dummyFinancialyearId}/${Todate}`)
      .subscribe((res: ForemanForPayment[]) => {
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

  ngOnInit(): void {
    this.tableColumns = ForemanPaymentApprovalMetadata.foremanPaymentDetails.tableColumns;

  }
  get approvalServiceUrl() {
    let user = this.authService.loggedInUser;
    
    return `${this.modalForms.serviceEndPoint}List/${user.companyId}/${user.branchId}/${user.userId}`;
  }

  openApproveRemarkDialog(isApproved: boolean): void {
    // if (this.modalForms.issued.model.maxlevel === this.modalForms.issued.model.approvalLevel) {
    //  this.modalForms.issued.model.approvalStatus = 1;
    //  console.log("max",this.modalForms.issued.model.maxlevel);
    //  console.log("level",this.modalForms.issued.model.approvalLevel);
    //  console.log("sta",this.modalForms.issued.model.approvalStatus);
    //   //const message = 'WARNING : Please select a payment';
    //  // this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
    //  // return;
    // }
    // else{
    //   this.modalForms.issued.model.approvalStatus =  this.modalForms.issued.model.approvalStatus + 1;
    // }
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveChanges(isApproved);
      }
    });
  }
  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ForemanPaymentApprovalMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ForemanPaymentApprovalMetadata.foremanPaymentDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.foremanPaymentDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchSiteManagerSelectOptions();
    this.fetchForemanSelectOptions();
    this.fetchBankNameSelectOptions();

  }
  private fetchBankNameSelectOptions() {
    this.dataHandler.get<BankAccount[]>(this.bankServiceUrl)
      .subscribe((res: BankAccount[]) => {
        if (res) {
          FormfieldHandler.bankDropdown.templateOptions.options = res.map((e: BankAccount) => (
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


  onApproveBtnClick() {
    const isApproved = true;
    this.openApproveRemarkDialog(isApproved);
  }

  onRejectBtnClick() {
    const isApproved = false;
    this.openApproveRemarkDialog(isApproved);
  }

  saveChanges(isApproved: boolean) {
    if (isApproved) {
      // this.selectedbill.approvalLevel++;
      console.log("sta",this.modalForms.issued.model.approvalStatus);

      if (this.modalForms.issued.model.maxlevel === this.modalForms.issued.model.approvalLevel) {
        this.modalForms.issued.model.approvalStatus = 1;
        console.log("max",this.modalForms.issued.model.maxlevel);
        console.log("level",this.modalForms.issued.model.approvalLevel);
        console.log("sta",this.modalForms.issued.model.approvalStatus);
        this.modalForms.issued.model.approvedBy = this.authService.loggedInUser.userId;
        this.modalForms.issued.model.approvedDate = new Date();
         //const message = 'WARNING : Please select a payment';
        // this.snackBar.open(message, null, { panelClass: 'snackbar-error-message' });
        // return;
       }
       else{
         this.modalForms.issued.model.approvalStatus =  this.modalForms.issued.model.approvalStatus + 1;
       }
  
    } 
    // else {
    //   this.selectedbill.approvalLevel--;
    // }
    // this.selectedbill.indentDetails = this.itemDatasource.data;
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.foremanWorkBillDetails = this.dataSource.data;
    
        return this.dataHandler.put<ForemanPayment>(ForemanPaymentMetadata.serviceEndPoint, [payload]).subscribe((res) => {
    // this.dataHandler.put<ForemanWorkBill>("BuildExeHR/api/ForemanWorkBill", [this.selectedbill]).subscribe((res) => {
      this.snackBar.open(` ${isApproved ? 'Approved' : 'Rejected'} Successfully`);
      // const rowToRemove = this.dataSource1.data.findIndex(e => e.id === this.selectedbill.id);
      // if (rowToRemove !== -1) {
      //   this.dataSource1.data.splice(rowToRemove, 1);
      //   // this.dataSource1._updateChangeSubscription();
      //   // this.itemDatasource.data = [];
      //   // this.itemDatasource._updateChangeSubscription();
      // }
    })
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
  onShowBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.fetchData();
    }
  }
  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ForemanPayment> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ForemanPayment>(ForemanPaymentApprovalMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 2,
        userId: 23
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ForemanPayment>(ForemanPaymentApprovalMetadata.serviceEndPoint, [payload]);
    }
  }
  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
  }

}