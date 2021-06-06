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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    this.tableColumns = MaterialPurchaseReturnMetadata.purchaseReturnDetail.tableColumns;
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
    FormfieldHandler.initialize(this.modalForms.purchaseReturn.fields);
    this.loadDropdowns();
    this.loadItemDetails();
  }

  loadItemDetails() {
    if (this.isEdit) {
      const endpoint = `${MaterialPurchaseReturnMetadata.serviceEndPoint}List/${this.editData.id}`;
      this.dataHandler.get(endpoint).subscribe((res: any[]) => {
        this.dataSource = new MatTableDataSource(res)
      });
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      dataRow['total'] = dataRow.quantity * dataRow.rate;
      this.dataSource.data.push(Object.assign({}, dataRow));
      this.dataSource._updateChangeSubscription();
      this.modalForms.purchaseReturnDetail.form.reset();
    }
  }

  removeItem(rowIndex: number) {
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

  get materialDropdown(): FormlyFieldConfig {
    return this.modalForms.purchaseReturnDetail.fields
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
    this.modalForms.purchaseReturn.form.reset();
    this.modalForms.purchaseReturnDetail.form.reset();
    this.modalForms.transferCharges.form.reset();
    this.projectDivisionFieldHandler.clear();
  }

}