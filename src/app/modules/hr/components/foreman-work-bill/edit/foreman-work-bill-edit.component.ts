import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ForemanWorkBill, ForemanWorkBillDetails } from '../definitions/foreman-work-bill.definition';
import { ForemanWorkBillMetadata } from '../foreman-work-bill.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field.handler';
import { MatPaginator } from '@angular/material/paginator';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { ForemanWorkOrderMetadata } from '../../foreman-work-order/foreman-work-order.configuration';
import { ForemanWorkOrder } from '../../foreman-work-order/definitions/foreman-work-order.definition';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-foreman-work-bill-edit',
  templateUrl: './foreman-work-bill-edit.component.html',
  styleUrls: ['./foreman-work-bill-edit.component.css']
})
export class ForemanWorkBillEditComponent implements OnInit {
  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<ForemanWorkBillEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ForemanWorkBill,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.module = ForemanWorkOrderMetadata;
    this.tableColumns = this.module.tableColumns
    this.defineModalForms();
    this.loadDropdowns();
  }
  fetchData() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<ForemanWorkBill[]>(`${this.module.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: ForemanWorkBill[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ForemanWorkBill> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.usage.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }


  ngOnInit(): void {
    this.tableColumns = ForemanWorkOrderMetadata.tableColumns;
    this.fetchData();
  }

  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: ForemanWorkBillMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: ForemanWorkBillMetadata.foremanWorkBillDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.foremanWorkBillDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchWorkCategorySelectOptions();
    //this.fetchContractorSelectOptions();
    this.fetchForemanSelectOptions();
    this.fetchWorkOrderNoSelectOptions();
    this.bindProjectDivisionFields();
  }

  onSaveBtnClick() {
    if (this.modalForms.usage.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.issued.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<ForemanWorkBill> {
    let payload = {
      ...this.modalForms.issued.model,
      materialUsageDetails: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<ForemanWorkBill>(ForemanWorkBillMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      payload = { ...payload, ...dummyDefaultFields }
      return this.dataHandler.post<ForemanWorkBill>(ForemanWorkBillMetadata.serviceEndPoint, [payload]);
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
      const dataRow: ForemanWorkBillDetails = Object.assign({}, this.modalForms.usage.model);
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.usage.form.reset();
    }
  }

  private fetchWorkCategorySelectOptions() {
    this.dataHandler.get<BasicWorkCategory[]>(this.workCategoryServiceUrl)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  private get workCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  private fetchForemanSelectOptions() {
    this.employeeService.getForeman().subscribe((res) => {
      if (res) {
        FormfieldHandler.foremanDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.fullName
          }
        ));
      }
    });
  }

  private fetchWorkOrderNoSelectOptions() {
    this.dataHandler.get<ForemanWorkOrder[]>(this.workOrderServiceUrl)
      .subscribe((res: ForemanWorkOrder[]) => {
        if (res) {
          FormfieldHandler.workOrderNoDropdown.templateOptions.options = res.map((e: ForemanWorkOrder) => (
            {
              label: e.userId,
              value: e.id
            }
          ));
        }
      });
  }

  private get workOrderServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${ForemanWorkOrderMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }


  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: ForemanWorkBillDetails) {
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
    this.subscribeProjectDivison.unsubscribe();
  }

}