import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialStockEntryMetadata } from '../material-stock-entry.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { MaterialStockEntry } from '../definitions/material-stock-entry.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialPurchaseOrder } from '../../material-purchase-order/definitions/material-purchase-order.definition';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialPurchaseOrderMetadata } from '../../material-purchase-order/material-purchase-order.configuration';

@Component({
  selector: 'app-material-stock-entry-edit',
  templateUrl: './material-stock-entry-edit.component.html',
  styleUrls: ['./material-stock-entry-edit.component.css']
})
export class MaterialStockEntryEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;

  tableColumns;
  dataSource;

  subscribeProjectDivison: Subscription;

  itemTableColumns;
  itemDatasource;
  selection;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialStockEntryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialStockEntry,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.tableColumns = MaterialStockEntryMetadata.purchaseOrderTableColumns;
    this.itemTableColumns = MaterialStockEntryMetadata.itemDetailstableColumns;
    this.fetchPurchaseOrder();
  }

  defineModalForms() {
    this.modalForms = {
      stockentry: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialStockEntryMetadata.formFields
      },
      transferCharges: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialStockEntryMetadata.transferChargeFormfields
      }
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get itemDataColumns() {
    if (this.itemTableColumns && this.itemTableColumns.length) {
      return this.itemTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.modalForms.stockentry.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.modalForms.stockentry.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialStockEntry> {
    let payload = { ...this.modalForms.stockentry.model, ...this.modalForms.transferCharges.model }
    payload.purchaseDetail = this.dataSource.data;
    if (this.isEdit) {
      return this.dataHandler.put<MaterialStockEntry>(MaterialStockEntryMetadata.serviceEndPoint, [payload]);
    } else {
      return this.dataHandler.post<MaterialStockEntry>(MaterialStockEntryMetadata.serviceEndPoint, [payload]);
    }
  }

  loadDropdowns() {
    this.fetchSuppliers();
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<MaterialStockEntry> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.stockentry.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
    this.subscribeProjectDivison = this.projectDivisionFieldsHandler.listenProjectDivisionChange
      .subscribe((res: number) => {
        this.showHideProjectDivisionBasedFields(res);
      })
  }

  showHideProjectDivisionBasedFields(projectDivision: number) {
    switch (projectDivision) {
      case 1:
        FormfieldHandler.unitDropdown.templateOptions.disabled = true;
        FormfieldHandler.unitDropdown.className = 'flex-1 readonly';
        FormfieldHandler.blockDropdown.templateOptions.disabled = true;
        FormfieldHandler.blockDropdown.className = 'flex-1 readonly';
        FormfieldHandler.floorDropdown.templateOptions.disabled = true;
        FormfieldHandler.floorDropdown.className = 'flex-1 readonly';
        break;
      case 2:
        FormfieldHandler.unitDropdown.templateOptions.disabled = false;
        FormfieldHandler.unitDropdown.className = 'flex-1';
        FormfieldHandler.blockDropdown.templateOptions.disabled = true;
        FormfieldHandler.blockDropdown.className = 'flex-1 readonly';
        FormfieldHandler.floorDropdown.templateOptions.disabled = true;
        FormfieldHandler.floorDropdown.className = 'flex-1 readonly';
        break;
      case 3:
        FormfieldHandler.unitDropdown.templateOptions.disabled = false;
        FormfieldHandler.unitDropdown.className = 'flex-1';
        FormfieldHandler.blockDropdown.templateOptions.disabled = false;
        FormfieldHandler.blockDropdown.className = 'flex-1';
        FormfieldHandler.floorDropdown.templateOptions.disabled = false;
        FormfieldHandler.floorDropdown.className = 'flex-1';
        break;
      case 4:
        FormfieldHandler.unitDropdown.templateOptions.disabled = true;
        FormfieldHandler.unitDropdown.className = 'flex-1 readonly';
        FormfieldHandler.blockDropdown.templateOptions.disabled = false;
        FormfieldHandler.blockDropdown.className = 'flex-1';
        FormfieldHandler.floorDropdown.templateOptions.disabled = false;
        FormfieldHandler.floorDropdown.className = 'flex-1';
        break;
    }
  }

  fetchSuppliers() {
    const user = this.authService.loggedInUser;
    this.dataHandler.get<SupplierRegistration[]>(`${SupplierRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`)
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

  onRowSelection(selected) {
    this.selection = selected;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    selected.purchaseOrderDetail.forEach(e => {
      e['total'] = e.quantityPurchased * e.itemRate;
    })
    this.itemDatasource = new MatTableDataSource(selected.purchaseOrderDetail);
  }

  fetchPurchaseOrder() {
    this.dataHandler.get<MaterialPurchaseOrder[]>(this.serviceEndpoint)
      .subscribe((res: MaterialPurchaseOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get serviceEndpoint() {
    const user = this.authService.loggedInUser;
    return `${MaterialPurchaseOrderMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

}
