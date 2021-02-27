import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EnquiryModeMetadata } from '../enquiry-mode.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { EnquiryMode } from '../definitions/enquiry-mode.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enquiry-mode-edit',
  templateUrl: './enquiry-mode-edit.component.html',
  styleUrls: ['./enquiry-mode-edit.component.css']
})
export class EnquiryModeEditComponent implements OnInit {

  form = new FormGroup({});
  model: EnquiryMode;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<EnquiryModeEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: EnquiryMode,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = EnquiryModeMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.id = this.model.id || Math.round(Math.random() * 100);
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<EnquiryMode> {
    if (this.isEdit) {
      return this.dataHandler.put<EnquiryMode>(EnquiryModeMetadata.serviceEndPoint, this.model);
    } else {
      delete this.model.id;
      return this.dataHandler.post<EnquiryMode>(EnquiryModeMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
