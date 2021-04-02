import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { EnquiryStatus } from '../definition/enquiry-status.definition';
import { EnquiryStatusMetadata } from '../enquiry-status.configuration';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enquiry-status-edit',
  templateUrl: './enquiry-status-edit.component.html',
  styleUrls: ['./enquiry-status-edit.component.css']
})
export class EnquiryStatusEditComponent implements OnInit {

  form = new FormGroup({});
  model: EnquiryStatus;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<EnquiryStatusEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: EnquiryStatus,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = EnquiryStatusMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.enquiryStatusId = this.model.enquiryStatusId || Math.round(Math.random() * 100);
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<EnquiryStatus> {
    if (this.isEdit) {
      return this.dataHandler.put<EnquiryStatus>(EnquiryStatusMetadata.serviceEndPoint, this.model);
    } else {
      delete this.model.enquiryStatusId;
      return this.dataHandler.post<EnquiryStatus>(EnquiryStatusMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
