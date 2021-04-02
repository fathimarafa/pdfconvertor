import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable, Subscription } from 'rxjs';
import { PurchaseOrderDetail, MaterialPurchaseOrder } from '../definitions/material-purchase-order.definition';
import { MaterialPurchaseOrderMetadata } from '../material-purchase-order.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialIndent } from '../../material-indent-creation/definitions/material-indent-creation.definiton';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectIndentComponent } from './select-indent/select-indent.component';
import { MaterialIndentCreationMetadata } from '../../material-indent-creation/material-indent-creation.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';

@Component({
  selector: 'app-material-purchase-order-edit',
  templateUrl: './material-purchase-order-edit.component.html',
  styleUrls: ['./material-purchase-order-edit.component.css']
})
export class MaterialPurchaseOrderEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  hasOpeningStock: boolean;
  enableItemEdit: boolean;
  indentList: MaterialIndent[]
  editData: MaterialPurchaseOrder;
  subscribeProjectDivison: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private dialog: MatDialog,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar
  ) {
    this.editData = this.stateService.getState(MaterialPurchaseOrderMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.calculateOrderTotal();
    this.defineModalForms();
    this.bindProjectDivisionFields();
    this.loadDropdowns();
    this.fetchIndent();
  }

  calculateOrderTotal() {
    if (this.isEdit) {
      this.editData.purchaseOrderDetail.forEach((e: PurchaseOrderDetail) => e['total'] = e.quantityPurchased * e.itemRate);
    }
  }

  bindProjectDivisionFields() {
    const projectControllerToFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.purchaseOrder.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerToFields);
    this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
      .subscribe((res: number) => {
        this.showHideProjectDivisionBasedFields(res);
      })
  }

  loadDropdowns(){
    this.fetchMaterials();
    this.fetchSuppliers();
  }

  ngOnInit(): void {
    this.tableColumns = MaterialPurchaseOrderMetadata.purchaseOrderDetail.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      purchaseOrder: {
        form: new FormGroup({}),
        model: this.editData || {},
        options: {},
        fields: MaterialPurchaseOrderMetadata.formFields
      },
      purchaseOrderDetails: {
        form: new FormGroup({}),
        model: this.editData || {},
        options: {},
        fields: MaterialPurchaseOrderMetadata.purchaseOrderDetail.formFields
      }
    }
    FormfieldHandler.initialize(this.modalForms.purchaseOrder.fields);
    this.dataSource = new MatTableDataSource(this.editData ? this.editData.purchaseOrderDetail || [] : []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSaveBtnClick() {
    if (this.modalForms.purchaseOrder.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/materialpurchaseorder');
  }

  get httpRequest(): Observable<MaterialPurchaseOrder> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    let payload = {
      ...this.modalForms.purchaseOrder.model,
      purchaseOrderDetail: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialPurchaseOrder>(MaterialPurchaseOrderMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialYearId: 1
      }
      payload = { ...dummyDefaultFields, ...payload };
      return this.dataHandler.post<MaterialPurchaseOrder>(MaterialPurchaseOrderMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  removeItem(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  onEditBtnClick(rowToEdit: PurchaseOrderDetail) {
    this.enableItemEdit = true;
    this.modalForms.purchaseOrderDetails.model = Object.assign({}, rowToEdit);
  }

  onAddDetailBtnClick() {
    if (this.modalForms.purchaseOrderDetails.form.valid) {
      const dataRow: PurchaseOrderDetail = Object.assign({}, this.modalForms.purchaseOrderDetails.model);
      dataRow.itemId = this.modalForms.purchaseOrder.model.itemId;
      dataRow['total'] = dataRow.quantityPurchased * dataRow.itemRate;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.purchaseOrderDetails.form.reset();
    }
  }

  onFieldValueChanged(ev, row: PurchaseOrderDetail, column: string) {
    if (ev.target.value) {
      row[column] = Number(ev.target.value);
      row['total'] = row.quantityPurchased * row.itemRate;
    }
  }

  fetchIndent() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<MaterialIndent[]>(`${MaterialIndentCreationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: MaterialIndent[]) => {
        this.indentList = res;
      });
  }

  onSelectIndentBtnClick() {
    const indentList: MaterialIndent[] = this.indentBySelectedProject;
    if (indentList.length) {
      const dialogReference = this.dialog.open(SelectIndentComponent, { data: this.indentList });
      dialogReference.afterClosed().subscribe((result: MaterialIndent[]) => {
        if (result) {
          const purchaseOrderDetails = result.map((e: MaterialIndent) => {
            return {
              itemId: e.materialId,
              indentId: e.id,
              remarks: e.remarks,
              quantityOrdered: e.quantityOrdered
            }
          });
          this.dataSource.data = this.dataSource.data.concat(purchaseOrderDetails);
        }
      });
    } else {
      const errorMessage = 'No matching records found , please clear filter fields and try again';
      this.snackBar.open(errorMessage, null, { panelClass: 'snackbar-error-message' });
    }
  }

  onUpdateDetailBtnClick() {

  }

  onCancelUpdateBtnClick() {
    this.enableItemEdit = false;
    this.modalForms.purchaseOrderDetails.form.reset();
  }

  get indentBySelectedProject() {
    if (this.modalForms.purchaseOrder.projectId) {
      return this.indentList.filter((e) => e.projectId === this.modalForms.purchaseOrder.projectId);
    } else {
      return this.indentList;
    }
  }

  showHideProjectDivisionBasedFields(projectDivision: number) {
    switch (projectDivision) {
      case 1:
        FormfieldHandler.unitDropdown.hideExpression = true;
        FormfieldHandler.blockDropdown.hideExpression = true;
        FormfieldHandler.floorDropdown.hideExpression = true;
        break;
      case 2:
        FormfieldHandler.unitDropdown.hideExpression = false;
        FormfieldHandler.blockDropdown.hideExpression = true;
        FormfieldHandler.floorDropdown.hideExpression = true;
        break;
      case 3:
        FormfieldHandler.unitDropdown.hideExpression = false;
        FormfieldHandler.blockDropdown.hideExpression = false;
        FormfieldHandler.floorDropdown.hideExpression = false;
        break;
      case 4:
        FormfieldHandler.unitDropdown.hideExpression = true;
        FormfieldHandler.blockDropdown.hideExpression = false;
        FormfieldHandler.floorDropdown.hideExpression = false;
        break;
    }
  }

  fetchMaterials() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<MaterialRegistration[]>(`${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
            {
              label: e.materialName,
              value: e.id
            }
          ));
        }
      });
  }


  fetchSuppliers() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<SupplierRegistration[]>(`${SupplierRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: SupplierRegistration[]) => {
        if (res) {
          FormfieldHandler.supplierDropdown.templateOptions.options = res.map((e: SupplierRegistration) => (
            {
              label: e.supplierName,
              value: e.id
            }
          ));
        }
      });
  }

  ngOnDestroy() {
    this.modalForms.purchaseOrder.form.reset();
    this.modalForms.purchaseOrderDetails.form.reset();
    this.projectDivisionFieldsHandler.clear();
    if (this.isEdit) {
      this.stateService.clear(MaterialPurchaseOrderMetadata.moduleId);
    }
    this.subscribeProjectDivison.unsubscribe();
  }

}
