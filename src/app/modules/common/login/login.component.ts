import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { LoginMetadata } from './login.configuration';
import { DataHandlerService } from 'src/app/services/datahandler/datahandler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from './definitions/login.definition';
import { Company } from '../../crm/components/company/definitions/company.definition';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  model: Login;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private dataHandler: DataHandlerService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.form = new FormGroup({});
    this.model = {};
    this.options = {};
    this.fields = LoginMetadata.formFields;
    this.loadCompany();
  }

  ngOnInit(): void {
  }


  onLoginBtnClick() {
    if (this.form.valid) {
      this.authService.login(this.httpRequest, this.model);
    }
  }

  get httpRequest() {
    return this.dataHandler.post(LoginMetadata.serviceEndPoint, this.model)
  }

  loadCompany() {
    this.dataHandler.get<Company[]>(LoginMetadata.serviceEndPoint).subscribe((res: Company[]) => {
      if (res) {
        this.companyDropdown.templateOptions.options = res.map((e: Company) => (
          {
            label: e.companyName,
            value: e.companyId
          }
        ));
        this.companyDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
          this.loadBranch();
        }
      }
    });
  }

  loadBranch() {
    const endpoint = `${LoginMetadata.serviceEndPoint}/${this.model.companyId}`
    this.dataHandler.get<Company[]>(endpoint).subscribe((res: Company[]) => {
      if (res) {
        this.branchDropdown.templateOptions.options = res.map((e: Company) => (
          {
            label: e.companyName,
            value: e.companyId
          }
        ));
      }
    });
  }

  private get companyDropdown(): FormlyFieldConfig {
    return this.fields.find((x: FormlyFieldConfig) => x.key === 'companyId');
  }

  private get branchDropdown(): FormlyFieldConfig {
    return this.fields.find((x: FormlyFieldConfig) => x.key === 'branchId');
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
