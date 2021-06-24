import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MaterialPurchaseReturn, PurchaseReturnDetail } from '../definitions/material-purchase-return.definition';
import { MaterialPurchaseReturnMetadata } from '../material-purchase-return.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';


@Component({
  selector: 'app-material-purchase-return-edit',
  templateUrl: './material-purchase-return-edit.component.html',
  styleUrls: ['./material-purchase-return-edit.component.css']
})
export class MaterialPurchaseReturnEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  hasOpeningStock: boolean;
  enableItemEdit: boolean;
  totalAmount = 0;

  constructor(
    private dialogRef: MatDialogRef<MaterialPurchaseReturnEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialPurchaseReturn,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldHandler: ProjectDivisionFieldsHandlerService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.bindProjectDivisionFields();
  }

  bindProjectDivisionFields() {
    const projectControllerFromFields: ProjectDivisionFields<any> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.modalForms.purchaseReturn.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldHandler.initialize(projectControllerFromFields);
  }

  ngOnInit(): void {
    this.listenNetAmountChange();
  }

  defineModalForms() {
    this.modalForms = {
      purchaseReturn: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialPurchaseReturnMetadata.formFields
      },
      purchaseReturnDetail: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialPurchaseReturnMetadata.purchaseReturnDetail.formFields
      },
      transferCharges: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialPurchaseReturnMetadata.transferCharges.formFields
      }
    }
    FormfieldHandler.initialize(this.modalForms.purchaseReturn.fields, this.modalForms.transferCharges.fields);
    this.tableColumns = MaterialPurchaseReturnMetadata.purchaseReturnDetail.tableColumns;
    this.loadDropdowns();
    this.loadItemDetails();
  }

  loadItemDetails() {
    if (this.isEdit) {
      const endpoint = `${MaterialPurchaseReturnMetadata.serviceEndPoint}List/${this.editData.id}`;
      this.dataHandler.get(endpoint).subscribe((res: any[]) => {
        this.totalAmount = 0;
        res.forEach(e => {
          const total = e.quantity * e.rate;
          const tax = total * (e.tax / 100);
          const discount = total * (e.disount / 100);
          e['total'] = total + tax - discount;
          this.totalAmount = this.totalAmount + e['total'];
        })
        this.dataSource = new MatTableDataSource(res);
        this.calculateNetAmount();
      });
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }

  loadDropdowns() {
    this.fetchSuppliers();
    this.fetchMaterials();
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
    if (this.modalForms.purchaseReturn.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.modalForms.purchaseReturn.model.approvedDate = new Date();
          this.modalForms.purchaseReturn.model.approvedBy = this.authService.loggedInUser.userId;
          this.modalForms.purchaseReturn.model.approvalLevel = 1;
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.modalForms.purchaseReturn.model
      }
      this.dialogRef.close(closeEvent);
    });
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialPurchaseReturn> {
    this.projectDivisionFieldHandler.setProjectDivisionFieldsDefaultValue();
    let payload = {
      ...this.modalForms.purchaseReturn.model,
      ...this.modalForms.transferCharges.model,
      purchaseReturnDetail: this.dataSource.data,
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialPurchaseReturn>(MaterialPurchaseReturnMetadata.serviceEndPoint, [payload]);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialYearId: 1
      }
      payload = { ...dummyDefaultFields, ...payload };
      return this.dataHandler.post<MaterialPurchaseReturn>(MaterialPurchaseReturnMetadata.serviceEndPoint, [payload]);
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
    if (this.modalForms.purchaseReturnDetail.form.valid) {
      const dataRow: PurchaseReturnDetail = Object.assign({}, this.modalForms.purchaseReturnDetail.model);
      const total = dataRow.quantity * dataRow.rate;
      const tax = total * (dataRow.tax / 100);
      const discount = total * (dataRow.disount / 100);
      dataRow['total'] = total + tax - discount;
      this.totalAmount = this.totalAmount + dataRow['total'];
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.purchaseReturnDetail.form.reset();
      this.calculateNetAmount();
    }
  }

  removeItem(rowIndex: number) {
    this.totalAmount = this.totalAmount - this.dataSource.data[rowIndex]['total'];
    this.dataSource.data.splice(rowIndex, 1)
    this.dataSource._updateChangeSubscription();
  }

  editItem(rowToEdit: PurchaseReturnDetail) {
    this.enableItemEdit = true;
    this.modalForms.purchaseReturnDetail.model = Object.assign({}, rowToEdit);
  }

  onUpdateItemBtnClick() {

  }

  onCancelItemUpdateBtnClick() {
    this.enableItemEdit = false;
    this.modalForms.purchaseReturnDetail.form.reset();
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

  get materialDropdown(): FormlyFieldConfig {
    return this.modalForms.purchaseReturnDetail.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
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
    this.modalForms.purchaseReturn.form.reset();
    this.modalForms.purchaseReturnDetail.form.reset();
    this.modalForms.transferCharges.form.reset();
    this.projectDivisionFieldHandler.clear();
  }

}