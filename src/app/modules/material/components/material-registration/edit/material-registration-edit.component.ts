import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MaterialRegistration, OpeningStock } from '../definitions/material-registration.definition';
import { MaterialRegistrationMetadata } from '../material-registration.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler, ModalFormFields } from '../handlers/form-field-handler';
import { MaterialCategoryRegistrationMetadata } from '../../material-category-registration/material-category-registration.configuration';
import { MaterialCategoryRegistration } from '../../material-category-registration/definitions/material-category.definition';
import { MaterialBrandRegistrationMetadata } from '../../material-brand-registration/material-brand-registration.configuration';
import { MaterialBrandRegistration } from '../../material-brand-registration/definitions/material-brand.definition';
import { UnitRegistrationMetadata } from '../../unit-registration/unit-registration.configuration';
import { UnitRegistration } from '../../unit-registration/definitions/unit-registration.definition';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-material-registration-edit',
  templateUrl: './material-registration-edit.component.html',
  styleUrls: ['./material-registration-edit.component.css']
})
export class MaterialRegistrationEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  addedStocks = [];
  hasOpeningStock: boolean;
  enableStockEdit: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialRegistration,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
    this.checkOpeningStock();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<OpeningStock> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.stock.model,
      isEdit: false
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  checkOpeningStock() {
    this.hasOpeningStock = this.modalForms.material.model.openigStock > 0 ? true : false;
    FormfieldHandler.openingStockDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.hasOpeningStock = this.modalForms.material.model.openigStock > 0 ? true : false;
    }
  }

  ngOnInit(): void {
    this.tableColumns = MaterialRegistrationMetadata.openingStock.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      material: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialRegistrationMetadata.formFields
      },
      stock: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialRegistrationMetadata.openingStock.formFields
      }
    }
    const formFields: ModalFormFields = {
      materialFields: this.modalForms.material.fields,
      stockFields: this.modalForms.stock.fields
    }
    FormfieldHandler.initialize(formFields);
    this.loadDropdowns();
    this.dataSource = new MatTableDataSource(this.editData.openingStock || []);
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchMaterialCategory();
    this.fetchMaterialBrand();
    this.fetchMaterialUnit();
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

  get httpRequest(): Observable<MaterialRegistration> {
    if (this.isEdit) {
      return this.dataHandler.put<MaterialRegistration>(MaterialRegistrationMetadata.serviceEndPoint, this.modalForms.material.model);
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
      console.log(payload);
      // return;
      return this.dataHandler.post<MaterialRegistration>(MaterialRegistrationMetadata.serviceEndPoint, [payload]);
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
    if (this.modalForms.stock.form.valid) {
      this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
      const dataRow: OpeningStock = Object.assign({}, this.modalForms.stock.model);
      dataRow.unit_Id = this.modalForms.stock.model.unitId;
      dataRow.financialYearId = 0;
      dataRow.materialId = 1;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.stock.form.reset();
    }
  }

  fetchMaterialCategory() {
    this.dataHandler.get<MaterialCategoryRegistration[]>(this.materialCategoryServiceUrl)
      .subscribe((res: MaterialCategoryRegistration[]) => {
        if (res) {
          FormfieldHandler.materialCategoryDropdown.templateOptions.options = res.map((e: MaterialCategoryRegistration) => (
            {
              label: e.materialCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  get materialCategoryServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialCategoryRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchMaterialBrand() {
    this.dataHandler.get<MaterialBrandRegistration[]>(this.materialBrandServiceUrl)
      .subscribe((res: MaterialBrandRegistration[]) => {
        if (res) {
          FormfieldHandler.materialBrandDropdown.templateOptions.options = res.map((e: MaterialBrandRegistration) => (
            {
              label: e.materialBrandName,
              value: e.id
            }
          ));
        }
      });
  }

  get materialBrandServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialBrandRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchMaterialUnit() {
    this.dataHandler.get<UnitRegistration[]>(this.materialUnitServiceUrl)
      .subscribe((res: UnitRegistration[]) => {
        if (res) {
          FormfieldHandler.materialUnitDropdown.templateOptions.options = res.map((e: UnitRegistration) => (
            {
              label: e.unitLongName,
              value: e.unitId
            }
          ));
        }
      });
  }

  get materialUnitServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${UnitRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  removeStock(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editStock(rowToEdit: OpeningStock) {
    this.enableStockEdit = true;
    this.modalForms.stock.model = rowToEdit;
  }

  onUpdateStockBtnClick() {
    
  }

  onCancelStockUpdateBtnClick() {

  }

  ngOnDestroy() {
    this.modalForms.material.form.reset();
    this.modalForms.stock.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}