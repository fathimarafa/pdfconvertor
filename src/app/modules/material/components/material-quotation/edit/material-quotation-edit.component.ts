import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialQuotationMetadata } from '../material-quotation.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { MaterialQuotation } from '../definitions/material-quotation.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MaterialRegistrationMetadata } from '../../material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../material-registration/definitions/material-registration.definition';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { FormfieldHandler } from '../handlers/form-field-handler';
import { MaterialIndentCreationMetadata } from '../../material-indent-creation/material-indent-creation.configuration';
import { MaterialIndent } from '../../material-indent-creation/definitions/material-indent-creation.definiton';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

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

  tableColumns;
  dataSource;
  isIndentLoadedOnce: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  constructor(
    private dialogRef: MatDialogRef<MaterialQuotationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: MaterialQuotation,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = MaterialQuotationMetadata.formFields;
    this.model = this.editData;
    FormfieldHandler.initialize(this.fields);
    this.loadDropdown();
    this.listenQuotationTypeChange();
    this.tableColumns = MaterialQuotationMetadata.selectIndentTableColumns;
    if (this.isEdit) {
      FormfieldHandler.termsAndConditionDropdown.defaultValue = 1;
      FormfieldHandler.termsAndConditionDropdown.templateOptions.disabled = true;
      if (this.model.quotationType === 'Based On Indent') {
        this.fetchIndent();
      }
    }
  }

  ngOnInit(): void { }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      if (this.model.quotationType === 'Based On Indent' && !this.model.indentId) {
        this.snackbar.open('WARNING :  Please select an indent');
        return;
      }
      if (!this.model['termsAndCondition']) {
        this.snackbar.open('WARNING :  Please select terms and conditions');
        return;
      }
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  fetchIndent() {
    this.dataHandler.get<MaterialIndent[]>(this.indentServiceUrl)
      .subscribe((res: MaterialIndent[]) => {
        this.isIndentLoadedOnce = true;
        if (this.isEdit) {
          const index = res.findIndex(e => e.id === this.model.indentId);
          if (index !== -1) {
            res[index]['isSelected'] = true;
          }
        }
        this.dataSource = new MatTableDataSource(res);
      });
  }

  get indentServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialIndentCreationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`
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

  get materialServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${MaterialRegistrationMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  listenQuotationTypeChange() {
    FormfieldHandler.quotationTypeDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      if (this.model.quotationType === 'Based On Indent') {
        if (!this.isIndentLoadedOnce) {
          this.fetchIndent();
        }
        FormfieldHandler.projectDropdown.templateOptions.disabled = true;
        FormfieldHandler.projectDropdown.className = 'flex-1 readonly';
        FormfieldHandler.materialDropdown.templateOptions.disabled = true;
        FormfieldHandler.materialDropdown.className = 'flex-1 readonly';
        this.model.materialId = 0;
        this.model.projectId = 0;
      }
      if (this.model.quotationType === 'Based On Project And Material') {
        FormfieldHandler.projectDropdown.templateOptions.disabled = false;
        FormfieldHandler.projectDropdown.className = 'flex-1';
        FormfieldHandler.materialDropdown.templateOptions.disabled = false;
        FormfieldHandler.materialDropdown.className = 'flex-1';
        this.model.indentId = 0;
      }
      if (this.model.quotationType === 'Based On Material') {
        FormfieldHandler.projectDropdown.templateOptions.disabled = true;
        FormfieldHandler.projectDropdown.className = 'flex-1 readonly';
        FormfieldHandler.materialDropdown.templateOptions.disabled = false;
        FormfieldHandler.materialDropdown.className = 'flex-1';
        this.model.projectId = 0;
      }
    }
  }

  fetchMaterial() {
    this.dataHandler.get<MaterialRegistration[]>(this.materialServiceUrl)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
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
          FormfieldHandler.projectDropdown.templateOptions.options = res.map((e: Project) => (
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

  onRowSelection(selected: MaterialIndent) {
    this.model.indentId = selected.id;
    this.dataSource.data.forEach((row) => {
      row.id === this.model.indentId ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
  }
  
  ngOnDestroy(){
    this.form.reset();
  }

}
