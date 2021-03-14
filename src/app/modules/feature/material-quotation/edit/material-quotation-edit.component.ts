import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialQuotationMetadata } from '../material-quotation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { MaterialQuotation } from '../definitions/material-quotation.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { Project } from '../../project/definitions/project.definition';
import { ProjectMetadata } from '../../project/project.configuration';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';

@Component({
  selector: 'app-material-quotation-edit',
  templateUrl: './material-quotation-edit.component.html',
  styleUrls: ['./material-quotation-edit.component.css']
})
export class MaterialQuotationEditComponent implements OnInit {

  form = new FormGroup({});
  model: MaterialQuotation;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<MaterialQuotationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialQuotation,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialQuotationMetadata.formFields;
    this.model = this.editData;
    this.loadDropdown();
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

  get httpRequest(): Observable<MaterialQuotation> {
    if (this.isEdit) {
      return this.dataHandler.put<MaterialQuotation>(MaterialQuotationMetadata.serviceEndPoint, this.model);
    } else {
      const defaultDummyFields = {
        companyId: 1, branchId: 1, indentId: 1, isDeleted: 1, userId: 1
      }
      const payload = { ...defaultDummyFields, ...this.model };
      return this.dataHandler.post<MaterialQuotation>(MaterialQuotationMetadata.serviceEndPoint, payload);
    }
  }

  get materialDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'materialId');
  }

  get projectDropdown(): FormlyFieldConfig {
    return this.fields
      .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'projectId');
  }

  fetchMaterial() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataHandler.get<MaterialRegistration[]>(endPoint)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          this.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
            {
              label: e.materialName,
              value: e.id
            }
          ));
        }
      });
  }

  fetchProject() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint)
      .subscribe((res: Project[]) => {
        if (res) {
          this.projectDropdown.templateOptions.options = res.map((e: Project) => (
            {
              label: e.projectName,
              value: e.id
            }
          ));
        }
      });
  }

  loadDropdown() {
    this.fetchMaterial();
    this.fetchProject();
  }

}
