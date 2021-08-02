import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { GroupLabourWagePayment, GroupLabourWagePaymentDetails } from '../definitions/group-labour-wage-payment.definition';
import { GroupLabourWagePaymentMetadata } from '../group-labour-wage-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
//import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
//import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-group-labour-wage-payment-edit',
  templateUrl: './group-labour-wage-payment-edit.component.html',
  styleUrls: ['./group-labour-wage-payment-edit.component.css']
})
export class GroupLabourWagePaymentEditComponent implements OnInit {
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  selection = new SelectionModel<GroupLabourWagePaymentDetails>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<GroupLabourWagePaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: GroupLabourWagePayment,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private employeeService: EmployeeService
    // private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    // if (Object.keys(this.editData).length) {
    //   this.isEdit = true;
    // }
    this.module = GroupLabourWagePaymentMetadata;
    this.tableColumns = this.module.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
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
    this.tableColumns = GroupLabourWagePaymentMetadata.groupLabourWagePaymentDetails.tableColumns;
    // this.dataSource = new MatTableDataSource(this.editData.groupLabourWagePaymentDetails || []);

  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: GroupLabourWagePaymentMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: GroupLabourWagePaymentMetadata.groupLabourWagePaymentDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.groupLabourWagePaymentDetails || []);

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

  private get bankServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchBankNameSelectOptions() {
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
            value: e.fullName
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
  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0; 
    const dummyEmployeeId = 8; const dummySitemanagerId = 0; const dummyFinancialyearId = 1; const dummyDateto = "2021-06-30";
    this.dataHandler.get<GroupLabourWagePayment[]>(`${"BuildExeHR/api/GroupLabourWagePayment"}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}/${dummyDateto}`)
      .subscribe((res: GroupLabourWagePayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });

  }
  onShowBtnClick() {
    if (this.modalForms.issued.form.valid) {
      this.fetchData();
    }
  }
  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<GroupLabourWagePayment> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<GroupLabourWagePayment>(GroupLabourWagePaymentMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 2,
        userId: 23
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<GroupLabourWagePayment>(GroupLabourWagePaymentMetadata.serviceEndPoint, [payload]);
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