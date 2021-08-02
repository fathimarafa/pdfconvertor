import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, Subscription } from 'rxjs';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { SubcontractorBill, SubcontractorBillDetails } from 'src/app/modules/hr/components/subcontractor-work-bill/definitions/subcontractor-work-bill.definition';
import { SubcontractorBillMetadata } from 'src/app/modules/hr/components/subcontractor-work-bill/subcontractor-work-bill.configuration';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../../subcontractor-work-bill/handlers/form-field.handler';
import { SubContractorWorkOrder } from '../../subcontractor-work-order/definitions/subcontractor-work-order.definition';
import { SubcontractorWorkOrderMetadata } from '../../subcontractor-work-order/subcontractor-work-order.configuration';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogEventHandlerService } from 'src/app/services/dialog-event-handler/dialogeventhandler.service';
import { AdditionalBillComponent } from 'src/app/modules/hr/components/subcontractor-work-bill/edit/additional-bill/additional-bill.component';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';

@Component({
  selector: 'app-subcontractor-work-bill-edit',
  templateUrl: './subcontractor-work-bill-edit.component.html',
  styleUrls: ['./subcontractor-work-bill-edit.component.css']
})
export class SubcontractorWorkBillEditComponent implements OnInit {

  module;
  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  enableStockEdit: boolean;
  model: SubcontractorBill;
  selection = new SelectionModel<SubContractorWorkOrder>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<SubcontractorWorkBillEditComponent>,
    private dialogEventHandler: DialogEventHandlerService,
    @Inject(MAT_DIALOG_DATA) private editData: SubcontractorBill,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private employeeService: EmployeeService
  ) {


    this.module = SubcontractorBillMetadata;
    this.tableColumns = this.module.subcontractorBillDetails.tableColumns;
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }


  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<SubcontractorBillDetails> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.issued.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);

  }




  fetchWorkOrderSelectOptions() {
    const user = this.authService.loggedInUser;
    const dummyprojectId = 1008; const dummyUnitId = 0; const dummyBlockId = 5; const dummyFloorId = 1; const dummySubContractorId = 12;
    const endPoint = `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${dummyUnitId}/${dummyBlockId}/${dummyFloorId}/${dummySubContractorId}`;
    this.dataHandler.get<any[]>(endPoint)
      .subscribe((res: any[]) => {
        if (res) {
          FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
            {
              label: e.workOrderNo,
              value: e.id
            }
          ));
        }
      });
  }

  // fetchWorkOrderSelectOptions() {

  //   this.dataHandler.get<any[]>(this.workorderServiceUrl)
  //       .subscribe((res: any[]) => {
  //         if (res) {
  //           FormfieldHandler.workorderDropdown.templateOptions.options = res.map((e: any) => (
  //             {
  //               label: e.workOrderNo,
  //               value: e.id
  //             }
  //           ));
  //           }
  //       });
  // }

  // get workorderServiceUrl() {
  //   const user = this.authService.loggedInUser;
  //   const dummyprojectId = 1008;
  //   return `${SubcontractorWorkOrderMetadata.serviceEndPoint}/${dummyprojectId}/${user.companyId}/${user.branchId}`;
  // }


  ngOnInit() {

  }

  onPrepareBtnClick() {
    if (this.modalForms.issued.form.valid) {
      const dummyCompanyId = 1; const dummyBranchId = 2;
      this.dataHandler.get<SubContractorWorkOrder[]>(`${this.module.serviceEndPoint1}/${dummyCompanyId}/${dummyBranchId}`)
        .subscribe((res: SubContractorWorkOrder[]) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
        });
    }
  }



  defineModalForms() {
    this.modalForms = {
      issued: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: SubcontractorBillMetadata.formFields
      },
      usage: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: SubcontractorBillMetadata.subcontractorBillDetails.formFields
      }
    }
    const formFields: ModalFormFields = {
      issued: this.modalForms.issued.fields,
      usage: this.modalForms.usage.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.subcontractorBillDetails || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchSubcontractorSelectOptions();
    // this.fetchMaterial();
    this.bindProjectDivisionFields();
    this.fetchWorkOrderSelectOptions();
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  // get httpRequest(): Observable<SubcontractorBill > {
  //   let payload = {
  //     ...this.modalForms.issued.model,
  //     materialUsageDetails: this.dataSource.data,
  //   }
  //   if (this.isEdit) {
  //     return this.dataHandler.put<SubcontractorBill>( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   } else {
  //     const dummyDefaultFields = {
  //       companyId: 1,
  //       branchId: 1,
  //       userId: 1
  //     }
  //     payload = { ...payload, ...dummyDefaultFields }
  //     return this.dataHandler.post<SubcontractorBill >( SubcontractorBillMetadata .serviceEndPoint, [payload]);
  //   }
  // }


  get httpRequest(): Observable<SubcontractorBill> {
    let payload: any = this.modalForms.issued.model
    payload.subContractorWorkOrderDetails = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<SubcontractorBill>(SubcontractorBillMetadata.serviceEndPoint, [payload]);
    } else {
      payload.isDeleted = 0;
      return this.dataHandler.post<SubcontractorBill>(SubcontractorBillMetadata.serviceEndPoint, [payload]);
    }
  }


  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      return columns;
    } else {
      return [];
    }
  }


  onAdditionalbillBtnClick(rowToEdit?: SubContractorWorkOrder) {
    this.dialogEventHandler.openDialog(
      AdditionalBillComponent,
      this.dataSource,
      rowToEdit,
      this.affectedRowIndex(rowToEdit)
    )
  }
  private affectedRowIndex(affectedRow?: SubContractorWorkOrder) {
    let indexToUpdate;
    if (affectedRow) {
      indexToUpdate = this.dataSource.data.findIndex((row: SubContractorWorkOrder) => row.id === affectedRow.id);
    }
    return indexToUpdate;
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


  private fetchSubcontractorSelectOptions() {
    this.employeeService.getSubContractor().subscribe((res) => {
      if (res) {
        FormfieldHandler.subcontractorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.fullName,
            value: e.id
          }
        ));
      }
    });
  }

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: SubcontractorBillDetails) {
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