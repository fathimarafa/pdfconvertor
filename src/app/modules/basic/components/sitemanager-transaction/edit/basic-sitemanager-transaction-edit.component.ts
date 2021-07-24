import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BasicSitemanagerTransactionMetadata } from '../basic-sitemanager-transaction.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { BasicSitemanagerTransaction } from '../definitions/sitemanager-transaction.definition';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { BasicDocumentType } from '../../document-type/definitions/basic-document-type.definition';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { EmployeeRegistrationMetadata } from 'src/app/modules/hr/components/employee-registration/employee-registration.configuration';
import { IEmployee } from 'src/app/modules/hr/components/employee-registration/definitions/employee.definiton';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { BankAccount } from '../../bank-account-registration/definitions/bank-account-registration.definition';
import { BankAccountRegistrtaionMetadata } from '../../bank-account-registration/bank-account-registration.configuration';

@Component({
  selector: 'app-basic-sitemanager-transaction-edit',
  templateUrl: './basic-sitemanager-transaction-edit.component.html',
  styleUrls: ['./basic-sitemanager-transaction-edit.component.css']
})
export class BasicSitemanagerTransactionEditComponent implements OnInit {

  form = new FormGroup({});
  model: BasicSitemanagerTransaction;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  editData;
  documentTypes: BasicDocumentType[];

  constructor(
    private dataHandler: DataHandlerService,
    private router: Router,
    private stateService: AppStateService,
    private snackBar: MatSnackBar,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService,
    private authService: AuthenticationService
  ) {
    this.editData = this.stateService.getState(BasicSitemanagerTransactionMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = BasicSitemanagerTransactionMetadata.formFields;
    this.model = this.editData || {};
    FormfieldHandler.initialize(this.fields);
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.fetchSitemanager();
    this.bindProjectDivisionFields();
    this.fetchBank();
  }

  ngOnInit(): void { }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<BasicSitemanagerTransaction> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        this.snackBar.open('Data Saved Successfully');
        this.onCancelBtnClick();
      });
    }
  }

  onCancelBtnClick() {
    this.router.navigateByUrl('/home/sitemanagertransaction');
  }

  get httpRequest(): Observable<BasicSitemanagerTransaction> {
    this.model.withClear = this.model.withClear ? 0 : 1;
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue();
    if (this.model.paymentMode === 'CASH') {
      this.model.paymentModeId = 0;
      this.model.paymentNo = '';
    }
    if (this.isEdit) {
      return this.dataHandler.put<BasicSitemanagerTransaction>(BasicSitemanagerTransactionMetadata.serviceEndPoint, this.model);
    } else {
      // const dummyDefaultFields = {
      //   companyId: 1, branchId: 1, financialyearId: 0, userId: 0
      // }
      // const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BasicSitemanagerTransaction>(BasicSitemanagerTransactionMetadata.serviceEndPoint, this.model);
    }
  }

  fetchSitemanager() {
    this.dataHandler.get<IEmployee[]>(this.sitemanagerServiceUrl)
      .subscribe((res: IEmployee[]) => {
        if (res) {
          FormfieldHandler.sitemanagerDropdown.templateOptions.options = res.map((e: IEmployee) => (
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

  private fetchBank() {
    this.dataHandler.get<BankAccount[]>(this.bankServiceUrl)
      .subscribe((res: BankAccount[]) => {
        if (res) {
          FormfieldHandler.bankDropdown.templateOptions.options = res.map((e: BankAccount) => (
            {
              label: e.bankName,
              value: e.id
            }
          ));
        }
      });
  }

  private get bankServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
    if (this.isEdit) {
      this.stateService.clear(BasicSitemanagerTransactionMetadata.moduleId);
    }
  }

}
