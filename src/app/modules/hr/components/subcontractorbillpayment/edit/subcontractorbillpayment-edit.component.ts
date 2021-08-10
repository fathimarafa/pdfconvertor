import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { SubcontractorbillPayment,SubContractorForPayment,SubContractorPaymentDetails} from '../definitions/subcontractor-bill-payment.definition';
import { SubcontractorPaymentMetadata } from '../subcontractorbillpayment.configuration';
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
import { SubcontractorBillMetadata } from '../../subcontractor-work-bill/subcontractor-work-bill.configuration';
import { SubcontractorBill } from '../../subcontractor-work-bill/definitions/subcontractor-work-bill.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';


@Component({
  selector: 'app-subcontractorbillpayment-edit',
  templateUrl: './subcontractorbillpayment-edit.component.html',
  styleUrls: ['./subcontractorbillpayment-edit.component.css']
})
export class SubcontractorbillpaymentEditComponent implements OnInit {

  model: SubContractorForPayment;
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  enquiryList: any[];
  selectedEnquiry;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<SubContractorForPayment>(true, []);


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  stageDatasource;
  snackBar: any;


  constructor(
    private dialogRef: MatDialogRef<SubcontractorbillpaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorbillPayment,
    private dataHandler: DataHandlerService,
    private employeeService: EmployeeService,
    private authService: AuthenticationService
    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = SubcontractorPaymentMetadata;
    this.tableColumns = this.module.subcontractorForPayment.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
  }


  ngOnInit() {
    
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
        fields: SubcontractorPaymentMetadata.subcontractorForPayment.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.subContractorPaymentDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {

    this.fetchSiteManagerSelectOptions();
    this.fetchBankNameSelectOptions();
    this.fetchSubContractorSelectOptions();
  
  }

  private fetchSubContractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      this.enquiryList = res;
      this.fetchData();
    });
  }

  doFilter(value: string) {
    this.selectedEnquiry = value;
    this.dataSource.filter = value + ''; //.trim().toLocaleLowerCase();
  }

  fetchData() {
    const dummyEmployeeId = 12; const dummySitemanagerId = 0; const dummyFinancialyearId = 1;
    this.dataHandler.get<SubContractorForPayment[]>(`${'BuildExeHR/api/SubContractorForPayment'}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}`)
      .subscribe((res: SubContractorForPayment[]) => {
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

 
  get httpRequest(): Observable<SubcontractorbillPayment> {
    let payload: any = this.modalForms.issued.model
    payload.subContractorPaymentDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
    }
  }



  onCancelBtnClick() {
    this.dialogRef.close();
  }

  

  ngOnDestroy() {
    this.modalForms.issued.form.reset();
    this.modalForms.usage.form.reset();
   
  }

}