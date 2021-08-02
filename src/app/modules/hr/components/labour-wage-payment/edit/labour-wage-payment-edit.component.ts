import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { LabourWagePayment, LabourWagePaymentDetails } from '../definitions/labour-wage-payment.definition';
import { LabourWagePaymentMetadata } from '../labour-wage-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-labour-wage-payment-edit',
  templateUrl: './labour-wage-payment-edit.component.html',
  styleUrls: ['./labour-wage-payment-edit.component.css']
})
export class LabourWagePaymentEditComponent implements OnInit {
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<LabourWagePaymentDetails>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<LabourWagePaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LabourWagePayment,
    private dataHandler: DataHandlerService,
    private employeeService: EmployeeService
    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = LabourWagePaymentMetadata;
    this.tableColumns = this.module.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
  }

  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0; 
    const dummyEmployeeId = 7; const dummySitemanagerId = 0; const dummyFinancialyearId = 1; const dummyDateto = "2021-06-30";
    this.dataHandler.get<LabourWagePayment[]>(`${"BuildExeHR/api/LabourWagePayment"}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}/${dummyDateto}`)
      .subscribe((res: LabourWagePayment[]) => {
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
    this.tableColumns = LabourWagePaymentMetadata.labourWagePaymentDetails.tableColumns;

  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: LabourWagePaymentMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: LabourWagePaymentMetadata.labourWagePaymentDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.labourWagePaymentDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchLabourSelectOptions();
    this.fetchSiteManagerSelectOptions();
    this.fetchBankNameSelectOptions();
    //this.fetchForemanSelectOptions();

    //this.fetchMaterial();
    // this.bindProjectDivisionFields();
  }

  fetchBankNameSelectOptions() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<BankAccount[]>(endPoint)
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

  private fetchLabourSelectOptions() {
    this.employeeService.getLabour().subscribe((res) => {
      if (res) {
        FormfieldHandler.labourDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  // fetchForemanSelectOptions() {
  //   const dummyCompanyId = 1; const dummyBranchId = 2; const dummyCategoryId = 5;
  //   const endPoint = `${EmployeeListMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}/${dummyCategoryId}`;
  //   this.dataHandler.get<EmployeeList[]>(endPoint)
  //     .subscribe((res: EmployeeList[]) => {
  //       if (res) {
  //         FormfieldHandler.foremanDropdown.templateOptions.options = res.map((e: EmployeeList) => (
  //           {
  //             label: e.fullName,
  //             value: e.fullName
  //           }
  //         ));
  //       }
  //     });
  // }
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

  get httpRequest(): Observable<LabourWagePayment> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<LabourWagePayment>(LabourWagePaymentMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 2,
        userId: 23
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<LabourWagePayment>(LabourWagePaymentMetadata.serviceEndPoint, [payload]);
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

  // showHideProjectDivisionBasedFields(projectDivision: number) {
  //   switch (projectDivision) {
  //     case 1:
  //       FormfieldHandler.unitFieldRow.hideExpression = true;
  //       FormfieldHandler.blockFloorRow.hideExpression = true;
  //       break;
  //     case 2:
  //       FormfieldHandler.unitFieldRow.hideExpression = false;
  //       FormfieldHandler.blockFloorRow.hideExpression = true;
  //       break;
  //     case 3:
  //       FormfieldHandler.unitFieldRow.hideExpression = false;
  //       FormfieldHandler.blockFloorRow.hideExpression = false;
  //       break;
  //     case 4:
  //       FormfieldHandler.unitFieldRow.hideExpression = true;
  //       FormfieldHandler.blockFloorRow.hideExpression = false;
  //       break;
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