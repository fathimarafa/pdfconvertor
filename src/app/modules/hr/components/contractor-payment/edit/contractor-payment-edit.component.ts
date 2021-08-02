import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ContractorForPayment, ContractorPayment, ContractorPaymentDetails } from '../definitions/contractor-payment.definition';
import { ContractorPaymentMetadata } from '../contractor-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-contractor-payment-edit',
  templateUrl: './contractor-payment-edit.component.html',
  styleUrls: ['./contractor-payment-edit.component.css']
})
export class ContractorPaymentEditComponent implements OnInit {
  model: ContractorForPayment;
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  enquiryList: any[];
  selectedEnquiry;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<ContractorForPayment>(true, []);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  stageDatasource;
  snackBar: any;


  constructor(
    private dialogRef: MatDialogRef<ContractorPaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ContractorPayment,
    private dataHandler: DataHandlerService,
    private employeeService: EmployeeService,
    private authService: AuthenticationService
    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = ContractorPaymentMetadata;
    this.tableColumns = this.module.contractorForPayment.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
  }
  /*fetchData() {
   // const dummyCompanyId = 1; const dummyBranchId = 0; 
   const dummyEmployeeId = 10; const dummySitemanagerId = 0; const dummyFinancialyearId = 1;
    this.dataHandler.get<ContractorForPayment[]>(`${"BuildExeHR/api/ContractorForPayment"}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}`)
      .subscribe((res: ContractorForPayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
      
  }*/
  // fetchData() {
  //   const endPoint = `${"BuildExeHR/api/ContractorForPayment"}/${this.model.employeeId}/${this.model.siteManagerId}/${this.model.financialYearId}`;
  //   this.dataHandler.get<ContractorForPayment[]>(endPoint)
  //     .subscribe((res: ContractorForPayment[]) => {
  //       this.stageDatasource = new MatTableDataSource(res);
  //     });
  // }

  ngOnInit() {
    // this.tableColumns = ContractorPaymentMetadata.contractorForPayment.tableColumns;

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
        fields: ContractorPaymentMetadata.contractorForPayment.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.contractorPaymentDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {

    this.fetchSiteManagerSelectOptions();
    this.fetchBankNameSelectOptions();
    this.fetchContractorSelectOptions();
    //this.fetchForemanSelectOptions();

    //this.fetchMaterial();
    // this.bindProjectDivisionFields();
  }

  private fetchContractorSelectOptions() {
    this.employeeService.getContractor().subscribe((res) => {
      this.enquiryList = res;
      this.fetchData();
    });
  }

  doFilter(value: string) {
    this.selectedEnquiry = value;
    this.dataSource.filter = value + ''; //.trim().toLocaleLowerCase();
  }

  fetchData() {
    const dummyEmployeeId = 10; const dummySitemanagerId = 0; const dummyFinancialyearId = 1;
    this.dataHandler.get<ContractorForPayment[]>(`${"BuildExeHR/api/ContractorForPayment"}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}`)
      //this.dataHandler.get<ContractorForPayment[]>(this.module.serviceEndPoint)
      .subscribe((res: ContractorForPayment[]) => {
        res.forEach((e) => {
          const exists = this.enquiryList.find(enq => enq.id === e.id);
          if (exists) {
            e.id = exists.id;
          }
        });
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.selectedEnquiry = res[0].id;
        this.doFilter(this.selectedEnquiry);
      });
  }
  // fetchData() {
  //   this.dataHandler.get<ContractorPayment[]>(this.module.serviceEndPoint)
  //     .subscribe((res: any[]) => {
  //       res.forEach((e) => {
  //         const exists = FormfieldHandler.contractorDropdown.find(enq => enq.enquiryId === e.enquiryId);
  //         if (exists) {
  //           e.enquiryNo = exists.enquiryNo;
  //         }
  //       });
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //       this.selectedContractor = res[0].enquiryId;
  //       this.doFilter(this.selectedContractor);
  //     });
  // }
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

  onSaveBtnClick() {
    if (this.modalForms.usage.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.usage.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }
  // onShowBtnClick(){
  // //  if (this.modalForms.usage.form.valid) {
  //  this.fetchData();
  // //  }
  // //  else{
  // //   this.snackBar.open('Data Saved Successfully');

  // //  }
  // }
  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ContractorForPayment> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ContractorForPayment>(ContractorPaymentMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 2,
        userId: 23
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ContractorForPayment>(ContractorPaymentMetadata.serviceEndPoint, [payload]);
    }
  }

  // get dataColumns() {
  //   if (this.tableColumns && this.tableColumns.length) {
  //     return this.tableColumns.map(col => col.field);
  //   } else {
  //     return [];
  //   }
  // }

  // onAddStockBtnClick() {
  //   if (this.modalForms.usage.form.valid) {
  //     this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
  //     const dataRow: ForemanPaymentDetails = Object.assign({}, this.modalForms.usage.model);
  //     this.dataSource.data.push(Object.assign({}, dataRow));
  //     this.dataSource._updateChangeSubscription();
  //     this.modalForms.usage.form.reset();
  //   }
  // }

  // removeStock(rowIndex: number) {
  //   this.dataSource.data.splice(rowIndex, 1)
  //   this.dataSource._updateChangeSubscription();
  // }

  // editStock(rowToEdit: ForemanPaymentDetails) {
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
    // this.projectDivisionFieldsHandler.clear();
    // this.subscribeProjectDivison.unsubscribe();
  }

}