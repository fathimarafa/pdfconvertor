import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MaterialTransferRequest, TransferDetail } from '../definitions/material-transfer-request.definition';
import { MaterialTransferRequestMetadata } from '../material-transfer-request.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';

@Component({
  selector: 'app-material-transfer-request-edit',
  templateUrl: './material-transfer-request-edit.component.html',
  styleUrls: ['./material-transfer-request-edit.component.css']
})
export class MaterialTransferRequestEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  subscribeProjectDivison: Subscription;
  hasOpeningStock: boolean;
  enableItemEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialTransferRequestEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialTransferRequest,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
    this.loadDropdowns();
  }

  bindProjectDivisionFields() {
    const model = {
      projectId: this.modalForms.material.model.projectIdFrom,
      unitId: this.modalForms.material.model.unitIdFrom,
      blockId: this.modalForms.material.model.blockIdFrom,
      floorId: this.modalForms.material.model.floorIdFrom
    }
    const projectControllerFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectFromDropdown,
      blockDropdown: FormfieldHandler.blockFromDropdown,
      floorDropdown: FormfieldHandler.floorFromDropdown,
      unitDropdown: FormfieldHandler.unitFromDropdown,
      model,
      isEdit: false
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
    this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
      .subscribe((res: number) => {
        this.showHideProjectDivisionBasedFields(res);
      })
  }

  ngOnInit(): void {
    this.tableColumns = MaterialTransferRequestMetadata.transferDetail.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      material: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialTransferRequestMetadata.formFields
      },
      transferDetail: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialTransferRequestMetadata.transferDetail.formFields
      },
      transferCharges: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialTransferRequestMetadata.transferCharges.formFields
      }
    }
    FormfieldHandler.initialize(this.modalForms.material.fields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.transferDetail || []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchMaterials();
  }

  onSaveBtnClick() {
    if (this.hasOpeningStock && this.dataSource.data.length < 1) {
      return;
    }
    if (this.modalForms.material.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.modalForms.material.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialTransferRequest> {
    if (this.isEdit) {
      return this.dataHandler.put<MaterialTransferRequest>(MaterialTransferRequestMetadata.serviceEndPoint, this.modalForms.material.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      const payload = {
        ...this.modalForms.material.model,
        openingStock: this.dataSource.data,
        ...dummyDefaultFields
      }
      return this.dataHandler.post<MaterialTransferRequest>(MaterialTransferRequestMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onItemBtnClick() {
    if (this.modalForms.transferDetail.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const dataRow: TransferDetail = Object.assign({}, this.modalForms.transferDetail.model);
      // dataRow.unit_Id = this.modalForms.transferDetail.model.unitId;
      // dataRow.financialYearId = 0;
      // dataRow.materialId = 1;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      // this.modalForms.transferDetail.form.reset();
    }
  }

  showHideProjectDivisionBasedFields(projectDivision: number) {
    // switch (projectDivision) {
    //   case 1:
    //     FormfieldHandler.unitDropdown.hideExpression = true;
    //     FormfieldHandler.blockDropdown.hideExpression = true;
    //     FormfieldHandler.floorDropdown.hideExpression = true;
    //     break;
    //   case 2:
    //     FormfieldHandler.unitDropdown.hideExpression = false;
    //     FormfieldHandler.blockDropdown.hideExpression = true;
    //     FormfieldHandler.floorDropdown.hideExpression = true;
    //     break;
    //   case 3:
    //     FormfieldHandler.unitDropdown.hideExpression = false;
    //     FormfieldHandler.blockDropdown.hideExpression = false;
    //     FormfieldHandler.floorDropdown.hideExpression = false;
    //     break;
    //   case 4:
    //     FormfieldHandler.unitDropdown.hideExpression = true;
    //     FormfieldHandler.blockDropdown.hideExpression = false;
    //     FormfieldHandler.floorDropdown.hideExpression = false;
    //     break;
    // }
  }

  // fetchMaterialCategory() {
  //   const dummyCompanyId = 1; const dummyBranchId = 0;
  //   const endPoint = `${MaterialCategoryRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
  //   this.dataHandler.get<MaterialCategoryRegistration[]>(endPoint)
  //     .subscribe((res: MaterialCategoryRegistration[]) => {
  //       if (res) {
  //         FormfieldHandler.materialCategoryDropdown.templateOptions.options = res.map((e: MaterialCategoryRegistration) => (
  //           {
  //             label: e.materialCategoryName,
  //             value: e.id
  //           }
  //         ));
  //       }
  //     });
  // }

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: TransferDetail) {
    this.enableItemEdit = true;
    this.modalForms.transferDetail.model = rowToEdit;
  }

  onUpdateStockBtnClick() {

  }

  onCancelStockUpdateBtnClick() {

  }

  get materialDropdown(): FormlyFieldConfig {
    return this.modalForms.transferDetail.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'materialId');
  }

  fetchMaterials() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<MaterialRegistration[]>(`${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          this.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
            {
              label: e.materialName,
              value: e.id
            }
          ));
        }
      });
  }

  ngOnDestroy() {
    this.modalForms.material.form.reset();
    this.modalForms.transferDetail.form.reset();
    this.projectDivisionFieldsHandler.clear();
    this.subscribeProjectDivison.unsubscribe();
  }

}