import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { MaterialSupplierPayment, SupplierPaymentDetails } from '../definitions/material-supplier-payment.definition';
import { MaterialSupplierPaymentMetadata } from '../material-supplier-payment.configuration';
import { MatTableDataSource } from '@angular/material/table';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-material-supplier-payment-edit',
  templateUrl: './material-supplier-payment-edit.component.html',
  styleUrls: ['./material-supplier-payment-edit.component.css']
})
export class MaterialSupplierPaymentEditComponent implements OnInit {

  modalForms;
  isEdit: boolean;
  tableColumns;
  dataSource;
  addedStocks = [];
  subscribeProjectDivison: Subscription;
  hasOpeningStock: boolean;
  enableStockEdit: boolean;

  selection = new SelectionModel<SupplierPaymentDetails>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<MaterialSupplierPaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialSupplierPayment,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.defineModalForms();
    this.loadDropdowns();
  }


  ngOnInit(): void {
    this.tableColumns = MaterialSupplierPaymentMetadata.supplierPaymentDetails.tableColumns;
  }

  defineModalForms() {
    this.modalForms = {
      payment: {
        form: new FormGroup({}),
        model: this.editData,
        options: {},
        fields: MaterialSupplierPaymentMetadata.formFields
      },
      paymentDetails: {
        form: new FormGroup({}),
        model: {},
        options: {},
        fields: MaterialSupplierPaymentMetadata.supplierPaymentDetails.formFields
      }
    }
    this.loadDropdowns();
    if (this.isEdit) {
      this.modalForms.paymentDetails.model.supplierId = this.editData.supplierId;
      this.fetchPurchaseForPayment(this.editData.supplierId);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDropdowns() {
    this.fetchSupplier();
  }

  onSaveBtnClick() {
    if (this.modalForms.payment.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.modalForms.payment.model
        }
        this.dialogRef.close(closeEvent);
      });
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<MaterialSupplierPayment> {
    this.modalForms.payment.model.withClear = this.modalForms.payment.model.withClear ? 1 : 0;
    this.modalForms.payment.model.onlinePayment = this.modalForms.payment.model.onlinePayment ? 1 : 0;
    if (this.isEdit) {
      const payload = {
        ...this.modalForms.payment.model,
        supplierPaymentDetails: this.selection.selected
      }
      payload.supplierId = this.modalForms.paymentDetails.model.supplierId;
      return this.dataHandler.put<MaterialSupplierPayment>(MaterialSupplierPaymentMetadata.serviceEndPoint, payload);
    } else {
      const dummyDefaultFields = {
        voucherNumber: 44, voucherTypeId: 1, finantialYearId: 1, companyId: 1, branchId: 1, billWise: 1, isDeleted: 0, chequeClearenceID: 0, supplierReturn: 0, approvalStatus: 1, approvalLevel: 0, approvedBy: 5
      }
      const payload = {
        ...this.modalForms.payment.model,
        supplierPaymentDetails: this.selection.selected,
        ...dummyDefaultFields
      }
      payload.supplierId = this.modalForms.paymentDetails.model.supplierId;
      return this.dataHandler.post<MaterialSupplierPayment>(MaterialSupplierPaymentMetadata.serviceEndPoint, [payload]);
    }
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      const columns = this.tableColumns.map(col => col.field);
      columns.push('select');
      return columns;
    } else {
      return [];
    }
  }

  fetchSupplier() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataHandler.get<SupplierRegistration[]>(`${SupplierRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: SupplierRegistration[]) => {
        if (res) {
          this.supplierDropdown.templateOptions.options = res.map((e: SupplierRegistration) => (
            {
              label: e.supplierName,
              value: e.id
            }
          ));
          this.supplierDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
            this.fetchPurchaseForPayment(event.value);
          }
        }
      });
  }

  fetchPurchaseForPayment(supplierId: number) {
    //params: supplierid/Sitemanagerid/finanacialyearid
    if (supplierId) {
      const Sitemanagerid = 0; const finanacialyearid = 71;
      const endpoint = 'BuildExeMaterial/api/PurchaseForPayment';
      this.dataHandler.get<any[]>(`${endpoint}/2/${Sitemanagerid}/${finanacialyearid}`)
        .subscribe((res: any[]) => {
          if (res) {
            this.dataSource = new MatTableDataSource(res);
          }
        });
    }
  }

  get supplierDropdown(): FormlyFieldConfig {
    return this.modalForms.paymentDetails.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'supplierId');
  }

  isAllSelected() {
    const totalSelected = this.selection.selected.length;
    const totalRows = this.dataSource.data.length;
    return totalSelected === totalRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnDestroy() {
    this.modalForms.payment.form.reset();
    this.modalForms.paymentDetails.form.reset();
  }

}