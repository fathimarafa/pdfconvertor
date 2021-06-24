import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { DocumentGroup } from '../definitions/document-group.definition';
import { DocumentGroupMetadata } from '../document-group.configuration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-group-edit',
  templateUrl: './document-group-edit.component.html',
  styleUrls: ['./document-group-edit.component.css']
})
export class DocumentGroupEditComponent implements OnInit {

  form = new FormGroup({});
  model: DocumentGroup;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<DocumentGroupEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: DocumentGroup,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = DocumentGroupMetadata.formFields;
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

  get httpRequest(): Observable<DocumentGroup> {
    if (this.isEdit) {
      return this.dataHandler.put<DocumentGroup>(DocumentGroupMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<DocumentGroup>(DocumentGroupMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
