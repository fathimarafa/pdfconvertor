import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { SubcontractorbillPayment, SubContractorForPayment, SubContractorPaymentDetails } from '../definitions/subcontractor-bill-payment.definition';
import { SubcontractorPaymentMetadata } from '../subcontractorbillpayment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { SupplierRegistration } from 'src/app/modules/material/components/supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from 'src/app/modules/material/components/supplier-registration/supplier-registration.configuration';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from 'src/app/modules/hr/components/subcontractorbillpayment/handlers/form-field.handler';
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

  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  enquiryList: any[];
  selectedEnquiry;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorbillpaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorbillPayment,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {
    this.module = SubcontractorPaymentMetadata;
    this.tableColumns = this.module.subContractorPaymentDetails.tableColumns
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubContractorPaymentDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    // this.projectDivisionFieldsHandler.initialize(projectControllerFields);
    // this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
    //   .subscribe((res: number) => {
    //     this.showHideProjectDivisionBasedFields(res);
    //   })
  }


  ngOnInit() {
    this.fetchSubcontractorSelectOptions();
  }

  // fetchData() {
  //   const dummyEmployeeId = 12; const dummySitemanagerId = 0; const dummyfinancialyearId=1;
  //   this.dataHandler.get<SubContractorForPayment[]>(`${'BuildExeHR/api/SubContractorForPayment'}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyfinancialyearId}`)
  //     .subscribe((res: SubContractorForPayment[]) => {
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }
  fetchData() {
    const dummyEmployeeId = 12; const dummySitemanagerId = 0; const dummyfinancialyearId = 1;
    this.dataHandler.get<SubContractorForPayment[]>(`${'BuildExeHR/api/SubContractorForPayment'}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyfinancialyearId}`)
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
    this.dataSource = new MatTableDataSource(this.editData.subContractorPaymentDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {

    this.fetchSubcontractorSelectOptions();
    this.fetchBankAccountNameSelectOptions();
    this.fetchSiteManagerSelectOptions();
    this.bindProjectDivisionFields();
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

  // get httpRequest(): Observable<SubcontractorbillPayment> {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     subContractorPaymentDetails: this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubcontractorbillPayment >(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubcontractorbillPayment >(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
  //   }
  // }

  get httpRequest(): Observable<SubcontractorbillPayment> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload: any = this.modalForms.issued.model
    payload.subContractorPaymentDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorbillPayment>(SubcontractorPaymentMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onAddStockBtnClick() {
    if (this.modalForms.usage.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const dataRow: SubContractorPaymentDetails = Object.assign({}, this.modalForms.usage.model);
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }

  private fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      this.enquiryList = res;
      this.fetchData();
    });
  }

  doFilter(value: string) {
    this.selectedEnquiry = value;
    this.dataSource.filter = value + ''; //.trim().toLocaleLowerCase();

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


  fetchBankAccountNameSelectOptions() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<BankAccount[]>(endPoint)
      .subscribe((res: BankAccount[]) => {
        if (res) {
          FormfieldHandler.bankaccountnameDropdown.templateOptions.options = res.map((e: BankAccount) => (
            {
              label: e.bankName,
              value: e.bankName
            }
          ));
        }
      });
  }


  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: SubContractorPaymentDetails) {
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

  }

}