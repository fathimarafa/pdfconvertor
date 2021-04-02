import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MaterialTransferRequest, TransferDetail } from '../definitions/material-transfer-request.definition';
import { MaterialTransferRequestMetadata } from '../material-transfer-request.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { TransferFromProjectDivision } from '../handlers/transfer-from-project-division';
import { TransferToProjectDivision } from '../handlers/transfer-to-project-division';

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
  hasOpeningStock: boolean;
  enableItemEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialTransferRequestEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialTransferRequest,
    private dataHandler: DataHandlerService,
    private transferFromProjectDivision: TransferFromProjectDivision,
    private transferToProjectDivision: TransferToProjectDivision
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerFromFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectFromDropdown,
      blockDropdown: FormfieldHandler.blockFromDropdown,
      floorDropdown: FormfieldHandler.floorFromDropdown,
      unitDropdown: FormfieldHandler.unitFromDropdown,
      model: this.modalForms.material.model,
      isEdit: this.isEdit
    };
    this.transferFromProjectDivision.initialize(projectControllerFromFields);
    const projectControllerToFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectToDropdown,
      blockDropdown: FormfieldHandler.blockToDropdown,
      floorDropdown: FormfieldHandler.floorToDropdown,
      unitDropdown: FormfieldHandler.unitToDropdown,
      model: this.modalForms.material.model,
      isEdit: this.isEdit
    };
    this.transferToProjectDivision.initialize(projectControllerToFields);
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
        model: this.editData,
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
    this.transferFromProjectDivision.setProjectDivisionFieldsDefaultValue();
    this.transferToProjectDivision.setProjectDivisionFieldsDefaultValue();
    this.modalForms.material.model.multicompany = this.modalForms.material.model.multicompany ? 1 : 0;
    let payload = {
      ...this.modalForms.material.model,
      ...this.modalForms.transferCharges.model,
      transferDetail: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialTransferRequest>(MaterialTransferRequestMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialYearId: 1
      }
      payload = { ...dummyDefaultFields, ...payload };
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

  onAddItemBtnClick() {
    if (this.modalForms.transferDetail.form.valid) {
      const dataRow: TransferDetail = Object.assign({}, this.modalForms.transferDetail.model);
      dataRow['total'] = dataRow.quantity * dataRow.rate;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.transferDetail.form.reset();
    }
  }

  removeItem(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editItem(rowToEdit: TransferDetail) {
    this.enableItemEdit = true;
    this.modalForms.transferDetail.model = Object.assign({}, rowToEdit);
  }

  onUpdateItemBtnClick() {

  }

  onCancelItemUpdateBtnClick() {
    this.enableItemEdit = false;
    this.modalForms.transferDetail.form.reset();
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
    this.modalForms.transferCharges.form.reset();
    this.transferFromProjectDivision.clear();
    this.transferToProjectDivision.clear();
  }

}