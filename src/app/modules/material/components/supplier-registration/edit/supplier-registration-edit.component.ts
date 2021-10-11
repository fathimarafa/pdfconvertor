import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyField } from '@ngx-formly/core';
import { SupplierRegistrationMetadata } from '../supplier-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { SupplierRegistration } from '../definitions/supplier-registration.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-supplier-registration-edit',
  templateUrl: './supplier-registration-edit.component.html',
  styleUrls: ['./supplier-registration-edit.component.css']
})
export class SupplierRegistrationEditComponent implements OnInit {

 
  form = new FormGroup({});
  model: SupplierRegistration;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  hasOpeningBalance: boolean;////
  static fields: any;

  constructor(
    private dialogRef: MatDialogRef<SupplierRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: SupplierRegistration,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = SupplierRegistrationMetadata.formFields;
    this.model = this.editData;
    this.checkOpeningBalance();//i
  }
 
  

  checkOpeningBalance() {
    this.hasOpeningBalance = this.model.openingBalance > 0 ? true : false;
    this.openingBalancee.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.hasOpeningBalance = this.model.openingBalance > 0 ? true : false;
        } 
  }


get openingBalancee():FormlyFieldConfig {
    return this.fields
        .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
        .find((x: FormlyFieldConfig) => x.key === 'openingBalance');
}
  

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }console.log("opening balance ",this.model.openingBalance); 
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<SupplierRegistration> {
    if (this.isEdit) {
      return this.dataHandler.put<SupplierRegistration>(SupplierRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1,
        branchId: 1,
        financialYearId: 2,
        openingBalanceRecover: this.model.openingBalance,
        userId: 1
      }
      const payload = { ...this.model, ...dummyDefaultFields };
      return this.dataHandler.post<SupplierRegistration>(SupplierRegistrationMetadata.serviceEndPoint, payload);
    }
  }

 
1
  ngOnDestroy() {
    this.form.reset();
  }

}
