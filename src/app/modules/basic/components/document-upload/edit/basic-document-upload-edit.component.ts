import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BasicDocumentUploadMetadata } from '../basic-document-upload.configuration';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { BasicDocumentUpload } from '../definitions/basic-document-upload.definition';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppStateService } from '../../../../../services/app-state-service/app-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { DocumentGroupMetadata } from '../../document-group/document-group.configuration';
import { DocumentGroup } from '../../document-group/definitions/document-group.definition';
import { BasicDocumentType } from '../../document-type/definitions/basic-document-type.definition';
import { BasicDocumentTypeMetadata } from '../../document-type/basic-document-type.configuration';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-basic-document-upload-edit',
  templateUrl: './basic-document-upload-edit.component.html',
  styleUrls: ['./basic-document-upload-edit.component.css']
})
export class BasicDocumentUploadEditComponent implements OnInit {

  form = new FormGroup({});
  model: BasicDocumentUpload;
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
    this.editData = this.stateService.getState(BasicDocumentUploadMetadata.moduleId);
    if (this.editData) {
      this.isEdit = true;
    }
    this.fields = BasicDocumentUploadMetadata.formFields;
    this.model = this.editData || {};
    FormfieldHandler.initialize(this.fields);
    this.loadDropdowns();
  }

  ngOnInit(): void { }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<BasicDocumentUpload> = {
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
    this.router.navigateByUrl('/home/documentupload');
  }

  get httpRequest(): Observable<BasicDocumentUpload> {
    if (this.isEdit) {
      return this.dataHandler.put<BasicDocumentUpload>(BasicDocumentUploadMetadata.serviceEndPoint, this.model);
    } else {
      const dummyDefaultFields = {
        companyId: 1, branchId: 1, financialyearId: 0, userId: 0
      }
      const payloads = { ...dummyDefaultFields, ...this.model };
      return this.dataHandler.post<BasicDocumentUpload>(BasicDocumentUploadMetadata.serviceEndPoint, payloads);
    }
  }

  loadDropdowns() {
    this.fetchDocumentGroup();
    FormfieldHandler.documentGroupDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      this.fetchDocumentType();
    }
    this.bindProjectDivisionFields();
  }

  fetchDocumentType() {
    if (this.documentTypes) {
      this.loadDocumentTypeDropdown();
    } else {
      this.dataHandler.get<BasicDocumentType[]>(this.documentServiceUrl)
        .subscribe((res: BasicDocumentType[]) => {
          if (res) {
            this.documentTypes = res;
            this.loadDocumentTypeDropdown();
          }
        });
    }
  }

  get documentServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${BasicDocumentTypeMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  loadDocumentTypeDropdown() {
    const documentTypesByGroup: BasicDocumentType[] = this.documentTypes.filter((e: BasicDocumentType) => e.documentGroupId === this.model.documentGroupId);
    FormfieldHandler.documentTypeDropdown.templateOptions.options = documentTypesByGroup.map((e: BasicDocumentType) => (
      {
        label: e.documentTypeName,
        value: e.id
      }
    ));
  }

  fetchDocumentGroup() {
    this.dataHandler.get<DocumentGroup[]>(this.documentGroupServiceUrl)
      .subscribe((res: DocumentGroup[]) => {
        if (res) {
          FormfieldHandler.documentGroupDropdown.templateOptions.options = res.map((e: DocumentGroup) => (
            {
              label: e.documentGroupName,
              value: e.id
            }
          ));
        }
      });
  }

  get documentGroupServiceUrl() {
    const user = this.authService.loggedInUser;
    return `${DocumentGroupMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  ngOnDestroy() {
    this.form.reset();
    if (this.isEdit) {
      this.stateService.clear(BasicDocumentUploadMetadata.moduleId);
    }
    this.projectDivisionFieldsHandler.clear();
  }

}
