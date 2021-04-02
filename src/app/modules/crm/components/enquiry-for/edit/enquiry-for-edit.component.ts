import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { EnquiryForMetadata } from '../enquiry-for.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { EnquiryFor } from '../definition/enquiry-for.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enquiry-for-edit',
  templateUrl: './enquiry-for-edit.component.html',
  styleUrls: ['./enquiry-for-edit.component.css']
})
export class EnquiryForEditComponent implements OnInit {

  form = new FormGroup({});
  model: EnquiryFor;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<EnquiryForEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: EnquiryFor,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = EnquiryForMetadata.formFields;
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

  get httpRequest(): Observable<EnquiryFor> {
    if (this.isEdit) {
      return this.dataHandler.put<EnquiryFor>(EnquiryForMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<EnquiryFor>(EnquiryForMetadata.serviceEndPoint, this.model);
    }
  }

}
