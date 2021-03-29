import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AccountHeadRegistrtaionMetadata } from '../account-head-registration.configuration';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { AccountGroup, AccountHead, AccountSubGroup, AccountType } from '../definitions/account-head-registration.definition';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormfieldHandler } from '../handlers/form-field-handler';

@Component({
  selector: 'app-account-head-registration-edit',
  templateUrl: './account-head-registration-edit.component.html',
  styleUrls: ['./account-head-registration-edit.component.css']
})
export class AccountHeadRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: AccountHead;
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
    this.editData = this.stateService.getState(AccountHeadRegistrtaionMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = AccountHeadRegistrtaionMetadata.formFields;
    this.model = this.editData || {};
    FormfieldHandler.initialize(this.fields);
    this.loadDropdowns();
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
    this.router.navigateByUrl('/home/accountheadregistration');
  }

  get httpRequest(): Observable<AccountHead> {
    if (this.isEdit) {
      return this.dataHandler.put<AccountHead>(AccountHeadRegistrtaionMetadata.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialyearId: 0, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<AccountHead>(AccountHeadRegistrtaionMetadata.serviceEndPoint, payloads);
    }
  }

  loadDropdowns() {
    this.fetchAccountType();
    FormfieldHandler.accountTypeDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.fetchAccountGroup();
    }
    FormfieldHandler.accountGroupDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.fetchAccountSubGroup();
    }
  }

  fetchAccountType() {
    this.dataHandler.get<AccountType[]>(AccountHeadRegistrtaionMetadata.dependentServiceEndpoints.accountType)
      .subscribe((res: AccountType[]) => {
        if (res) {
          FormfieldHandler.accountTypeDropdown.templateOptions.options = res.map((e: AccountType) => (
            {
              label: e.account_type_name,
              value: e.account_type_id
            }
          ));
        }
      });
  }

  fetchAccountGroup() {
    const endPoint = `${AccountHeadRegistrtaionMetadata.dependentServiceEndpoints.accountGroup}/${this.model.accountTypeId}`;
    this.dataHandler.get<AccountGroup[]>(endPoint)
      .subscribe((res: AccountGroup[]) => {
        if (res) {
          FormfieldHandler.accountGroupDropdown.templateOptions.options = res.map((e: AccountGroup) => (
            {
              label: e.account_group_name,
              value: e.account_group_id
            }
          ));
        }
      });
  }

  fetchAccountSubGroup() {
    const endPoint = `${AccountHeadRegistrtaionMetadata.dependentServiceEndpoints.accountSubGroup}/${this.model.accountGroupId}`;
    this.dataHandler.get<AccountSubGroup[]>(endPoint)
      .subscribe((res: AccountSubGroup[]) => {
        if (res) {
          FormfieldHandler.accountSubGroupDropdown.templateOptions.options = res.map((e: AccountSubGroup) => (
            {
              label: e.accountSubGroupName,
              value: e.accountSubGroupId
            }
          ));
        }
      });
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(AccountHeadRegistrtaionMetadata.moduleId);
    }
  }

}
