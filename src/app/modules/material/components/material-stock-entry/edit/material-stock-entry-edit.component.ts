import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialStockEntryMetadata } from '../material-stock-entry.configuration';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
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
import { Router } from '@angular/router';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { Employee } from 'src/app/modules/hr/components/employee-registration/definitions/employee.definiton';
import { EmployeeRegistrationMetadata } from 'src/app/modules/hr/components/employee-registration/employee-registration.configuration';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';

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
  modalName;

  totalAmount = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialStockEntryEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialStockEntry,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private dialog: MatDialog,
    private router: Router
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.tableColumns = this.tableToDisplay;
    this.itemTableColumns = MaterialStockEntryMetadata.itemDetailstableColumns;
    this.modalName = this.isDirectEntry ? 'Direct Stock Entry' : 'Stock Entry';
    this.isDirectEntry ? this.fetchMaterial() : this.fetchPurchaseOrder();
  }

  get isDirectEntry() {
    return this.router.url.includes('directstockentry');
  }

  get tableToDisplay() {
    return this.isDirectEntry ? MaterialStockEntryMetadata.materialTableColumns : MaterialStockEntryMetadata.purchaseOrderTableColumns;
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
    FormfieldHandler.initialize(this.modalForms.stockentry.fields, this.modalForms.transferCharges.fields);
    this.loadDropdowns();
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

  ngOnInit(): void {
    this.listenNetAmountChange();
  }

  openApproveDialog(): void {
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveChanges();
      }
    });
  }

  get isEditedFromApproval() {
    return this.router.url.includes('approval');
  }

  onSaveBtnClick(nextLevel?: boolean) {
    if (this.modalForms.stockentry.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.modalForms.stockentry.model.approvedDate = new Date();
          this.modalForms.stockentry.model.approvedBy = this.authService.loggedInUser.userId;
          this.modalForms.stockentry.model.approvalLevel = 1;
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.modalForms.stockentry.model
      }
      this.dialogRef.close(closeEvent);
    })
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialStockEntry> {
    let payload = { ...this.modalForms.stockentry.model, ...this.modalForms.transferCharges.model }
    payload.purchaseDetail = this.itemDatasource.data;
    if (this.isEdit) {
      return this.dataHandler.put<MaterialStockEntry>(MaterialStockEntryMetadata.serviceEndPoint, [payload]);
    } else {
      return this.dataHandler.post<MaterialStockEntry>(MaterialStockEntryMetadata.serviceEndPoint, [payload]);
    }
  }

  loadDropdowns() {
    this.fetchSuppliers();
    this.bindProjectDivisionFields();
    this.loadWorkCategory();
    this.fetchSitemanager();
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
    if (this.isDirectEntry) {
      this.materialRowSelection(selected);
    } else {
      this.purchaseRowSelection(selected);
    }
    this.calculateItemDetailsTableTotal();
    this.itemDatasource._updateChangeSubscription();
  }

  materialRowSelection(selected) {
    selected.isSelected = !selected.isSelected;
    this.dataSource._updateChangeSubscription();
    if (!this.itemDatasource) {
      this.itemDatasource = new MatTableDataSource();
    }
    let index = this.itemDatasource.data.findIndex(e => e.id === selected.id);
    if (index !== -1) {
      this.itemDatasource.data.splice(index, 1);
    } else {
      let data = {
        "materialId": selected.id,
        "quantity": 1,
        "rate": selected.materialUnitRate,
        "disount": selected.tax || 0,
        "tax": selected.tax || 0,
        "total": selected.materialUnitRate
      }
      this.itemDatasource.data.push(data);
    }
  }

  purchaseRowSelection(selected) {
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    let data = selected.purchaseOrderDetail.map(e => {
      return {
        "materialId": e.itemId,
        "quantity": 1,
        "rate": e.itemRate,
        "disount": e.disount,
        "tax": e.tax,
        "total": e.itemRate
      }
    });
    this.itemDatasource = new MatTableDataSource(data);
  }

  fetchMaterial() {
    this.dataHandler.get<MaterialRegistration[]>(this.materialServiceEndpoint)
      .subscribe((res: MaterialRegistration[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  onUserInput($event, row, column) {
    row[column] = $event.target.value;
    row['total'] = row.quantity * row.rate;
    this.calculateItemDetailsTableTotal();
  }

  calculateItemDetailsTableTotal() {
    this.totalAmount = 0;
    this.itemDatasource.data.forEach((row) => {
      this.totalAmount = this.totalAmount + row['total'];
    });
  }

  get materialServiceEndpoint() {
    const user = this.authService.loggedInUser;
    return `${MaterialRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchPurchaseOrder() {
    this.dataHandler.get<MaterialPurchaseOrder[]>(this.purchaseOrderServiceEndpoint)
      .subscribe((res: MaterialPurchaseOrder[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      });
  }

  get purchaseOrderServiceEndpoint() {
    const user = this.authService.loggedInUser;
    return `${MaterialPurchaseOrderMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  private loadWorkCategory() {
    this.dataHandler.get(this.workCategoryServiceEndpoint)
      .subscribe((res: BasicWorkCategory[]) => {
        if (res) {
          FormfieldHandler.workCategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
            {
              label: e.workCategoryName,
              value: e.id
            }
          ));
        }
      });
  }

  get workCategoryServiceEndpoint() {
    const user = this.authService.loggedInUser;
    return `${BasicWorkCategoryMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  fetchSitemanager() {
    this.dataHandler.get<Employee[]>(this.sitemanagerServiceUrl)
      .subscribe((res: Employee[]) => {
        if (res) {
          FormfieldHandler.sitemanagerDropdown.templateOptions.options = res.map((e: Employee) => (
            {
              label: e.fullName,
              value: e['id']
            }
          ));
        }
      });
  }

  get sitemanagerServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${EmployeeRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`
  }


  private listenTaxAreaChange() {
    FormfieldHandler.taxAreaDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      // if (this.modalForms.transferCharges.model.taxArea === 'INTRA') {
      //   this.sgstPerInputbox.className = 'flex-1';
      //   this.igstPerInputbox.className = 'flex-1 readonly';
      //   this.cgstPerInputbox.className = 'flex-1 readonly';
      //   this.sgstPerInputbox.templateOptions.readonly = false;
      //   this.igstPerInputbox.templateOptions.readonly = true;
      //   this.cgstPerInputbox.templateOptions.readonly = true;
      //   this.detailsModel.igstPercent = 0;
      //   this.detailsModel.igstAmt = 0;
      //   this.detailsModel.cgstPercent = 0;
      //   this.detailsModel.cgstAmount = 0;
      // }
      // if (this.modalForms.transferCharges.model.taxArea === 'INTER') {
      //   this.sgstPerInputbox.className = 'flex-1 readonly';
      //   this.igstPerInputbox.className = 'flex-1';
      //   this.cgstPerInputbox.className = 'flex-1 readonly';
      //   this.sgstPerInputbox.templateOptions.readonly = true;
      //   this.igstPerInputbox.templateOptions.readonly = false;
      //   this.cgstPerInputbox.templateOptions.readonly = true;
      //   this.detailsModel.sgstPercent = 0;
      //   this.detailsModel.sgstAmt = 0;
      //   this.detailsModel.cgstPercent = 0;
      //   this.detailsModel.cGSTAmt = 0;
      // }
      this.modalForms.transferCharges.model = { ...this.modalForms.transferCharges.model }
    }
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
  }

  private calculateNetAmount() {
    this.modalForms.transferCharges.model.netamount = this.totalAmount + this.modalForms.transferCharges.model.transportationCharge + this.modalForms.transferCharges.model.loadingUnloadingCharge + this.modalForms.transferCharges.model.otherCharges;
    this.modalForms.transferCharges.model = { ...this.modalForms.transferCharges.model };
  }

  ngOnDestroy() {
    this.modalForms.stockentry.form.reset();
    this.modalForms.transferCharges.form.reset();
    this.projectDivisionFieldsHandler.clear();
  }

}
