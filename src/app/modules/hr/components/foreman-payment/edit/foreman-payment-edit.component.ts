import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ForemanForPayment, ForemanPayment, ForemanPaymentDetails } from '../definitions/foreman-payment.definition';
import { ForemanPaymentMetadata } from '../foreman-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';

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
    private employeeService: EmployeeService
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
    this.tableColumns = ForemanPaymentMetadata.foremanForPayment.tableColumns;

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
        fields: ForemanPaymentMetadata.foremanForPayment.formFields
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
    //this.fetchForemanSelectOptions();

    //this.fetchMaterial();
    // this.bindProjectDivisionFields();
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

  fetchData() {
    // const dummyCompanyId = 1; const dummyBranchId = 0; 
    const dummyEmployeeId = 13; const dummySitemanagerId = 0; const dummyFinancialyearId = 1; const dummyTodate = "2021-06-06";
    this.dataHandler.get<ForemanForPayment[]>(`${"BuildExeHR/api/ForemanForPayment"}/${dummyEmployeeId}/${dummySitemanagerId}/${dummyFinancialyearId}/${dummyTodate}`)
      .subscribe((res: ForemanForPayment[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });

  }
  onShowBtnClick() {
    //if (this.modalForms.issued.form.valid) {
    this.fetchData();
    //}
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