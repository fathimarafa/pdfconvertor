import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { BasicDocumentType } from '../definitions/basic-document-type.definition';
import { BasicDocumentTypeMetadata } from '../basic-document-type.configuration';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';
import { DocumentGroup } from '../../document-group/definitions/document-group.definition';
import { DocumentGroupMetadata } from '../../document-group/document-group.configuration';

@Component({
  selector: 'app-document-type-edit',
  templateUrl: './document-type-edit.component.html',
  styleUrls: ['./document-type-edit.component.css']
})
export class DocumentTypeEditComponent implements OnInit {

  form = new FormGroup({});
  model: BasicDocumentType;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<DocumentTypeEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: BasicDocumentType,
    private dataHandler: DataHandlerService,
    private authService: AuthenticationService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = BasicDocumentTypeMetadata.formFields;
    this.model = this.editData;
    this.loadDocumentGroupDropdown();
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

  get httpRequest(): Observable<BasicDocumentType> {
    if (this.isEdit) {
      return this.dataHandler.put<BasicDocumentType>(BasicDocumentTypeMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<BasicDocumentType>(BasicDocumentTypeMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  loadDocumentGroupDropdown() {
    this.dataHandler.get<DocumentGroup[]>(this.documentGroupUrl)
      .subscribe((res: DocumentGroup[]) => {
        if (res) {
          this.documentGroupDropdown.templateOptions.options = res.map((e: DocumentGroup) => (
            {
              label: e.documentGroupName,
              value: e.id
            }
          ));
        }
      });
  }

  get documentGroupUrl() {
    const user = this.authService.loggedInUser;
    return `${DocumentGroupMetadata.serviceEndPoint}/${user.companyId}/${user.branchId}`;
  }

  get documentGroupDropdown(): FormlyFieldConfig {
    return this.fields.find((x: FormlyFieldConfig) => x.key === 'documentGroupId');
  }

}
