import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { MaterialSupplierAdvance } from '../definitions/material-supplier-advance.definition';
import { MaterialSupplierAdvanceMetadata } from '../material-supplier-advance.configuration';
import { Observable } from 'rxjs';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { Router } from '@angular/router';
import { FormfieldHandler } from '../handlers/form-field.handler';

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
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialSupplierAdvanceMetadata.formFields;
    this.model = this.editData;
    FormfieldHandler.loadDropdowns(this.fields, this.dataHandler, this.authService.loggedInUser)
  }

  ngOnInit(): void { }

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
    if (this.form.valid) {
      if (this.isEditedFromApproval) {
        this.openApproveDialog();
      } else {
        if (nextLevel) {
          this.model.approvedBy = this.authService.loggedInUser.userId;
          this.model.approvalLevel = 1;
          this.model.approvedDate = new Date().toISOString() as unknown as Date;
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.model
      };
      this.dialogRef.close(closeEvent);
    })
  }

  // onSaveBtnClick() {
  //   if (this.form.valid) {
  //     this.httpRequest.subscribe((res) => {
  //       const closeEvent: IDialogEvent = {
  //         action: this.isEdit ? DialogActions.edit : DialogActions.add,
  //         data: res || this.model
  //       }
  //       this.dialogRef.close(closeEvent);
  //     })
  //   }
  // }

  get httpRequest(): Observable<MaterialSupplierAdvance> {
    this.model.withClear = this.model.withClear ? 1 : 0;
    if (this.model.paymentMode !== 'BANK') {
      this.model.paymentBy = 0;
      this.model.paymentNo = '';
    }
    if (this.isEdit) {
      return this.dataHandler.put<MaterialSupplierAdvance>(MaterialSupplierAdvanceMetadata.serviceEndPoint, this.model);
    } else {
      // const defaultDummyFields = {
      //   companyId: 1, branchId: 1, financialYearId: 1, approvalStatus: 1, approvalLevel: 1, approvedBy: 0, approvedDate: new Date().toISOString(), voucherTypeId: 1, voucherNumber: 6, isDeleted: 0
      // }
      // const payload = { ...defaultDummyFields, ...this.model }
      this.model.approvedBy = this.authService.loggedInUser.userId;
      this.model.approvalLevel = 0;
      this.model.approvedDate = new Date().toISOString() as unknown as Date;
      return this.dataHandler.post<MaterialSupplierAdvance>(MaterialSupplierAdvanceMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.form.reset();
  }

}


