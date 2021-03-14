import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { MaterialSupplierAdvance } from '../definitions/material-supplier-advance.definition';
import { MaterialSupplierAdvanceMetadata } from '../material-supplier-advance.configuration';
import { Observable } from 'rxjs';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';

@Component({
  selector: 'app-material-supplier-advance-edit',
  templateUrl: './material-supplier-advance-edit.component.html',
  styleUrls: ['./material-supplier-advance-edit.component.css']
})
export class MaterialSupplierAdvanceEditComponent implements OnInit {

  form = new FormGroup({});
  model: MaterialSupplierAdvance;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<MaterialSupplierAdvanceEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialSupplierAdvance,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialSupplierAdvanceMetadata.formFields;
    this.model = this.editData;
    this.fetchSuppliers();
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<MaterialSupplierAdvance> {
    this.model.withClear = this.model.withClear ? 1 : 0;
    if (this.isEdit) {
      return this.dataHandler.put<MaterialSupplierAdvance>(MaterialSupplierAdvanceMetadata.serviceEndPoint, this.model);
    } else {
      const defaultDummyFields = {
        companyId: 1, branchId: 1, financialYearId: 1, approvalStatus: 1, approvalLevel: 1, approvedBy: 0, approvedDate: new Date().toISOString(), voucherTypeId: 1, voucherNumber: 6, isDeleted: 0
      }
      const payload = { ...defaultDummyFields, ...this.model }
      return this.dataHandler.post<MaterialSupplierAdvance>(MaterialSupplierAdvanceMetadata.serviceEndPoint, payload);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  fetchSuppliers() {
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
        }
      });
  }

  get supplierDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'supplierId');
  }

  ngOnDestroy(){
    this.form.reset();
  }

}


