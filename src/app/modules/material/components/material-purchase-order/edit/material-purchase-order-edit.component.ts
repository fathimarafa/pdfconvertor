import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Observable, Subscription } from 'rxjs';
import { PurchaseOrderDetail, MaterialPurchaseOrder } from '../definitions/material-purchase-order.definition';
import { MaterialPurchaseOrderMetadata } from '../material-purchase-order.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
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
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { DialogActions, IDialogEvent } from 'src/app/definitions/dialog.definitions';

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
  totalAmount = 0;

  constructor(
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private dialog: MatDialog,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.editData = this.stateService.getState(MaterialPurchaseOrderMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.populateItemDetailsTable();
    this.bindProjectDivisionFields();
    this.loadDropdowns();
    this.fetchIndent();
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
  }

  loadDropdowns() {
    this.fetchMaterials();
    this.fetchSuppliers();
  }

  ngOnInit(): void { }

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
  }

  populateItemDetailsTable() {
    this.tableColumns = MaterialPurchaseOrderMetadata.purchaseOrderDetail.tableColumns;
    if (this.isEdit) {
      const endpoint = `${MaterialPurchaseOrderMetadata.serviceEndPoint}List/${this.editData.id}`;
      this.dataHandler.get(endpoint).subscribe((res: any[]) => {
        this.totalAmount = 0;
        res.forEach(e => {
          e['total'] = e.quantityPurchased * e.itemRate;
          this.totalAmount = this.totalAmount + e['total'];
        })
        this.dataSource = new MatTableDataSource(res);
      });
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }

  openApproveDialog(): void {
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpRequest.subscribe((res) => {
          this.snackBar.open('Data Saved Successfully');
        })
      }
    });
  }

  get isEditedFromApproval() {
    return this.router.url.includes('approval');
  }

  onSaveBtnClick(nextLevel?: boolean) {
    if (this.modalForms.purchaseOrder.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.modalForms.purchaseOrder.model.approvedDate = new Date();
          this.modalForms.purchaseOrder.model.approvedBy = this.authService.loggedInUser.userId;
          this.modalForms.purchaseOrder.model.approvalLevel = 1;
        }
        this.httpRequest.subscribe((res) => {
          this.snackBar.open('Data Saved Successfully');
          this.onCancelBtnClick();
        });
      }
    }
  }

  onCancelBtnClick() {
    if (this.isEditedFromApproval) {
      document.getElementsByClassName('cdk-overlay-container')[0].remove();
    } else {
      this.router.navigateByUrl('/home/materialpurchaseorder');
    }
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
    this.totalAmount = this.totalAmount - this.dataSource.data[rowIndex]['total'];
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
      this.totalAmount = this.totalAmount + dataRow['total'];
    }
  }

  onFieldValueChanged(ev, row: PurchaseOrderDetail, column: string) {
    if (ev.target.value) {
      row[column] = Number(ev.target.value);
      row['total'] = row.quantityPurchased * row.itemRate;
    }
  }

  fetchIndent() {
    this.dataHandler.get<MaterialIndent[]>(this.indentServiceUrl)
      .subscribe((res: MaterialIndent[]) => {
        this.indentList = res;
      });
  }

  get indentServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialIndentCreationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  onSelectIndentBtnClick() {
    const indentList: MaterialIndent[] = this.indentBySelectedProject;
    if (indentList.length) {
      const dialogReference = this.dialog.open(SelectIndentComponent, { data: this.indentList });
      dialogReference.afterClosed().subscribe((result: any[]) => {
        if (result) {
          const purchaseOrderDetails = result.map((e) => {
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

  fetchMaterials() {
    this.dataHandler.get<MaterialRegistration[]>(this.materialServiceUrl)
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

  get materialServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchSuppliers() {
    this.dataHandler.get<SupplierRegistration[]>(this.supplierServiceUrl)
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

  get supplierServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${SupplierRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
      let domStyle = cdkDom[0]['style'];
      domStyle.maxHeight = '90vh';
      domStyle.overflow = 'scroll';
      // domStyle.height = '94vh';
    }
  }

  ngOnDestroy() {
    this.modalForms.purchaseOrder.form.reset();
    this.modalForms.purchaseOrderDetails.form.reset();
    this.projectDivisionFieldsHandler.clear();
    if (this.isEdit) {
      this.stateService.clear(MaterialPurchaseOrderMetadata.moduleId);
    }
  }

}
