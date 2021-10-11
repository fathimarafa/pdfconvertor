import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { ForemanPaymentMetadata } from '../foreman-payment.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-foreman-payment-edit',
  templateUrl: './foreman-payment-edit.component.html',
  styleUrls: ['./foreman-payment-edit.component.css']
})
export class ForemanPaymentEditComponent implements OnInit {
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
    private dialogRef: MatDialogRef<ForemanPaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanPayment,
    private dataHandler: DataHandlerService,
    private employeeService: EmployeeService,
    private authService: AuthenticationService

    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = ForemanPaymentMetadata;
    this.tableColumns = this.module.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
   
  }
  onUserInput($event, row, column) {
    row[column] = Number($event.target.value);
    // row['amount'] = row.noOfLabours * row.workRate;
    // row['oTAmount'] = row.oTRate * row.oTHours;
    // row['total'] = row['amount'] + row['oTAmount'];
    // // this.calculateItemDetailsTableTotal();
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
    this.tableColumns = ForemanPaymentMetadata.foremanPaymentDetails.tableColumns;
    if (this.modalForms.issued.model.paymentModeId === 0) {
      FormfieldHandler.paymentModeDropdown.templateOptions.disabled = true;
    
    }

  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ForemanPaymentMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ForemanPaymentMetadata.foremanPaymentDetails.formFields
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
    foremanPaymentDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ForemanPayment>(ForemanPaymentMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 2,
        userId: 23
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ForemanPayment>(ForemanPaymentMetadata.serviceEndPoint, [payload]);
    }
  }
  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
  }

}