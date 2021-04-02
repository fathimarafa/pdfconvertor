import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BankAccountRegistrtaionMetadata } from '../bank-account-registration.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { BankAccount } from '../definitions/bank-account-registration.definition';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bank-account-registration-edit',
  templateUrl: './bank-account-registration-edit.component.html',
  styleUrls: ['./bank-account-registration-edit.component.css']
})
export class BankAccountRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: BankAccount;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  editData;

  constructor(
    private dataHandler: DataHandlerService,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar
  ) {
    this.editData = this.stateService.getState(BankAccountRegistrtaionMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = BankAccountRegistrtaionMetadata.formFields;
    this.model = this.editData || {};
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/bankaccountregistration');
  }

  get httpRequest(): Observable<BankAccount> {
    this.model.isOD = this.model.isOD ? 1 : 0;
    if (this.isEdit) {
      return this.dataHandler.put<BankAccount>(BankAccountRegistrtaionMetadata.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialyearId: 0, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BankAccount>(BankAccountRegistrtaionMetadata.serviceEndPoint, payloads);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(BankAccountRegistrtaionMetadata.moduleId);
    }
  }

}
