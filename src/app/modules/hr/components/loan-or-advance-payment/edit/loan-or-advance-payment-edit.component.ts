import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { LoanOrAdvancePaymentMetaData } from '../loan-or-advance-payment.configuration';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { LoanOrAdvancePayment } from '../definitions/loan-or-advance-payment.definition';
import {
  IDialogEvent,
  DialogActions,
} from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { FormfieldHandler } from './../handlers/form-field-handler';
import { IEmployee } from 'src/app/modules/hr/components/employee-registration/definitions/employee.definiton';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { EmployeeRegistrationMetadata } from 'src/app/modules/hr/components/employee-registration/employee-registration.configuration';
import { EmployeeDesignationRegistrationMetadata } from '../../employee-designation-registration/employee-designation-registration.configuration';
import { EmployeeDesignationRegistration } from '../../employee-designation-registration/definitions/employee-designation.definition';
import { Router } from '@angular/router';
import { FormApprovalDialogComponent } from 'src/app/modules/common/form-approval-dialog/form-approval-dialog.component';
import { BankAccountRegistrationComponent } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.component';
import { BankAccount } from 'src/app/modules/basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { BankAccountRegistrtaionMetadata } from 'src/app/modules/basic/components/bank-account-registration/bank-account-registration.configuration';

@Component({
  selector: 'app-loan-or-advance-payment-edit',
  templateUrl: './loan-or-advance-payment-edit.component.html',
  styleUrls: ['./loan-or-advance-payment-edit.component.css'],
})
export class LoanOrAdvancePaymentEditComponent implements OnInit {
  form = new FormGroup({});
  model: LoanOrAdvancePayment;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<LoanOrAdvancePaymentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: LoanOrAdvancePayment,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = LoanOrAdvancePaymentMetaData.formFields;
    this.model = this.editData;
    FormfieldHandler.initialize(this.fields);
  }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDesignations();
    this.fetchBank();
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
          this.model.approvalStatus = 1;
          this.model.approvalRemarks = '';
          this.model.approvedDate = new Date().toISOString();
        }
        this.saveChanges();
      }
    }
  }

  saveChanges() {
    const user = this.authService.loggedInUser;

    this.model.projectId = 1;
    if (!this.isEdit) {
      this.model.unitId = 0;
      this.model.blockId = 0;
      this.model.floorId = 0;
      this.model.id = 0;
      this.model.companyId = user.companyId;
      this.model.branchId = user.branchId;
      this.model.userId = user.userId;
      this.model.financialYearId = 1;
      this.model.paymentModeNo = '1';
      this.model.voucherTypeId = 0;
      this.model.voucherNumber = 0;
      this.model.isDeleted = 0;
      this.model.date = new Date(this.model.date).toISOString();

      this.model.approvedBy = 0;
      this.model.approvalLevel = 0;
      this.model.approvalStatus = 0;
      this.model.approvalRemarks = '';
      this.model.approvedDate = '9999-12-31';
    }

    this.httpRequest.subscribe((res) => {
      const closeEvent: IDialogEvent = {
        action: this.isEdit ? DialogActions.edit : DialogActions.add,
        data: res || this.model,
      };
      this.dialogRef.close(closeEvent);
    });
  }

  openApproveDialog(): void {
    const dialogRef = this.dialog.open(FormApprovalDialogComponent, {
      data: '',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveChanges();
      }
    });
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<LoanOrAdvancePayment> {
    if (this.isEdit) {
      const endPoint = `${LoanOrAdvancePaymentMetaData.serviceEndPoint}`;
      return this.dataHandler.put<LoanOrAdvancePayment>(endPoint, this.model);
    } else {
      return this.dataHandler.post<LoanOrAdvancePayment>(
        LoanOrAdvancePaymentMetaData.serviceEndPoint,
        this.model
      );
    }
  }

  fetchEmployees() {
    this.dataHandler
      .get<IEmployee[]>(this.employeesServiceUrl)
      .subscribe((res: IEmployee[]) => {
        if (res) {
          FormfieldHandler.employeeDropdown.templateOptions.options = res.map(
            (e: IEmployee) => ({
              label: e.fullName,
              value: e['id'],
            })
          );
        }
      });
  }

  fetchBank() {
    this.dataHandler
      .get<BankAccount[]>(this.bankAccountServiceUrl)
      .subscribe((res: BankAccount[]) => {
        if (res) {
          FormfieldHandler.bankDropdown.templateOptions.options = res.map(
            (e: BankAccount) => ({
              label: e.bankName,
              value: e['bankId'],
            })
          );
        }
      });
  }

  fetchDesignations() {
    this.dataHandler
      .get<EmployeeDesignationRegistration[]>(this.designationServiceUrl)
      .subscribe((res: EmployeeDesignationRegistration[]) => {
        if (res) {
          FormfieldHandler.designationDropdown.templateOptions.options =
            res.map((e: EmployeeDesignationRegistration) => ({
              label: e.employeeDesignationName,
              value: e['id'],
            }));
        }
      });
  }

  get employeesServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${EmployeeRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  get designationServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${EmployeeDesignationRegistrationMetadata.serviceEndPoint}/${user.companyId}/0/0`;
  }

  get bankAccountServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }
}
