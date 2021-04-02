import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CompanyMetadata } from '../company.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Company } from '../definitions/company.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  form = new FormGroup({});
  model: Company;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<CompanyEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Company,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = CompanyMetadata.formFields;
    this.setCompanySelectOptions();
    this.model = this.editData;
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<Company> {
    this.formatBranchFormdata();
    if (this.isEdit) {
      return this.dataHandler.put<Company>(CompanyMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<Company>(CompanyMetadata.serviceEndPoint, this.model);
    }
  }

  private formatBranchFormdata() {
    if (typeof (this.model.isBranch) === 'boolean') {
      if (this.model.isBranch) {
        this.model.isBranch = 1;
      } else {
        this.model.isBranch = 0;
        this.model.parentCompanyid = -1;
      }
    }
  }

  private setCompanySelectOptions() {
    this.dataHandler.get<Company[]>(CompanyMetadata.serviceEndPoint).subscribe((res: Company[]) => {
      if (res) {
        const notBranchCompanies: Company[] = res.filter((company: Company) => !company.isBranch && company.companyId !== this.model.companyId);
        if (notBranchCompanies && notBranchCompanies.length) {
          for (let field of this.fields) {
            const indexToUpdate = field.fieldGroup.findIndex((field: FormlyFieldConfig) => field.key === 'parentCompanyid');
            if (indexToUpdate >= 0) {
              field.fieldGroup[indexToUpdate].templateOptions.options = notBranchCompanies.map((e: Company) => (
                { label: e.companyName, value: e.companyId }
              ));
              break;
            }
          }
        }
      }
    });
  }

}
