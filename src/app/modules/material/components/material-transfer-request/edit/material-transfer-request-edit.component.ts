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
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { MaterialIndentCreationMetadata } from '../../material-indent-creation/material-indent-creation.configuration';
import { MaterialIndent } from '../../material-indent-creation/definitions/material-indent-creation.definiton';
import { MaterialBrandRegistration } from '../../material-brand-registration/definitions/material-brand.definition';
import { MaterialBrandRegistrationMetadata } from '../../material-brand-registration/material-brand-registration.configuration';

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
  totalAmount = 0;

  indentTableColumns;
  indentDataSource;

  selectFromIndent: boolean;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialTransferRequestEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialTransferRequest,
    private dataHandler: DataHandlerService,
    private transferFromProjectDivision: TransferFromProjectDivision,
    private transferToProjectDivision: TransferToProjectDivision,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
  }

  onSelectFromIndentChange() {
    this.selectFromIndent = !this.selectFromIndent;
    if (this.selectFromIndent) {
      this.tableColumns.pop();
    } else {
      this.tableColumns.push({
        "field": 'action',
        "displayName": 'Action'
      });
    }
    if (this.selectFromIndent && !this.indentDataSource) {
      this.fetchIndent();
    }
    this.dataSource.data = [];
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
    this.indentTableColumns = MaterialTransferRequestMetadata.indentTableColumns;
    this.listenNetAmountChange();
  }

  onRowSelection(selected: MaterialIndent) {
    this.indentDataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.indentDataSource._updateChangeSubscription();
    let rows = selected.indentDetails.map(e => {
      return {
        materialId: e.materialId,
        quantity: 1,
        rate: 0,
        tax: 0,
        total: 0
      }
    })
    this.dataSource = new MatTableDataSource(rows);
  }

  onUserInput($event, row, column) {
    row[column] = $event.target.value;
    row['total'] = row.quantity * row.rate;
    this.calculateItemDetailsTableTotal();
  }

  calculateItemDetailsTableTotal() {
    this.totalAmount = 0;
    this.dataSource.data.forEach((row) => {
      this.totalAmount = this.totalAmount + row['total'];
    });
    this.calculateNetAmount();
  }

  fetchIndent() {
    this.dataHandler.get<MaterialIndent[]>(this.indentServiceUrl)
      .subscribe((res: MaterialIndent[]) => {
        this.indentDataSource = new MatTableDataSource(res);
      });
  }

  get indentServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialIndentCreationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
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
    FormfieldHandler.initialize(this.modalForms.material.fields, this.modalForms.transferCharges.fields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.transferDetail || []);
    if (this.isEdit) {
      this.calculateItemDetailsTableTotal();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchMaterialBrand();
    this.fetchMaterials();
    this.fetchIndent();
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

  get indentDataColumns() {
    if (this.indentTableColumns && this.indentTableColumns.length) {
      return this.indentTableColumns.map(col => col.field);
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
      this.calculateItemDetailsTableTotal();
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
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'materialId');
  }

  fetchMaterials() {
    this.dataHandler.get<MaterialRegistration[]>(this.materialServiceUrl)
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

  get materialServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  get materialBrandDropdown(): FormlyFieldConfig {
    return this.modalForms.transferDetail.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'brandId');
  }

  fetchMaterialBrand() {
    this.dataHandler.get<MaterialBrandRegistration[]>(this.brandServiceUrl)
      .subscribe((res: MaterialBrandRegistration[]) => {
        if (res) {
          this.materialBrandDropdown.templateOptions.options = res.map((e: MaterialBrandRegistration) => (
            {
              label: e.materialBrandName,
              value: e.id
            }
          ));
        }
      });
  }

  get brandServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialBrandRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  doFilter(value: string) {
    this.indentDataSource.filter = value.trim().toLocaleLowerCase();
  }

  private listenNetAmountChange() {
    //transportation charge
    FormfieldHandler.transportChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.transportationPer = (this.modalForms.transferCharges.model.transportationCharge / this.totalAmount) * 100;
      this.calculateNetAmount();
    }
    FormfieldHandler.transportChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.transportationCharge = (this.totalAmount * this.modalForms.transferCharges.model.transportationPer) / 100
      this.calculateNetAmount();
    }
    // loading charge
    FormfieldHandler.loadingChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.loadingUnloadingPer = (this.modalForms.transferCharges.model.loadingUnloadingCharge / this.totalAmount) * 100;
      this.calculateNetAmount();
    }
    FormfieldHandler.loadingChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.loadingUnloadingCharge = (this.totalAmount * this.modalForms.transferCharges.model.loadingUnloadingPer) / 100
      this.calculateNetAmount();
    }
    //other charge
    FormfieldHandler.otherChargeAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.otherChargesPer = (this.modalForms.transferCharges.model.otherCharges / this.totalAmount) * 100;
      this.calculateNetAmount();
    }
    FormfieldHandler.otherChargePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.otherCharges = (this.totalAmount * this.modalForms.transferCharges.model.otherChargesPer) / 100
      this.calculateNetAmount();
    }
    // additional charge
    FormfieldHandler.miscellaneousExpenseAmtInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.miscellaneousExpensePer = (this.modalForms.transferCharges.model.miscellaneousExpense / this.totalAmount) * 100;
      this.calculateNetAmount();
    }
    FormfieldHandler.miscellaneousExpensePerInputBox.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.modalForms.transferCharges.model.miscellaneousExpense = (this.totalAmount * this.modalForms.transferCharges.model.miscellaneousExpensePer) / 100
      this.calculateNetAmount();
    }
  }

  private calculateNetAmount() {
    this.modalForms.transferCharges.model.netAmount = this.totalAmount + this.modalForms.transferCharges.model.transportationCharge + this.modalForms.transferCharges.model.loadingUnloadingCharge + this.modalForms.transferCharges.model.otherCharges + this.modalForms.transferCharges.model.miscellaneousExpense;
    this.modalForms.transferCharges.model = { ...this.modalForms.transferCharges.model };
  }


  ngOnDestroy() {
    this.modalForms.material.form.reset();
    this.modalForms.transferDetail.form.reset();
    this.modalForms.transferCharges.form.reset();
    this.transferFromProjectDivision.clear();
    this.transferToProjectDivision.clear();
  }

}