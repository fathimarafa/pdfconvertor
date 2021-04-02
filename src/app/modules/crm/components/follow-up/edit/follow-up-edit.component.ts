import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FollowUpMetadata } from '../follow-up.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { FollowUp } from '../definitions/follow-up.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-follow-up-edit',
  templateUrl: './follow-up-edit.component.html',
  styleUrls: ['./follow-up-edit.component.css']
})
export class FollowUpEditComponent implements OnInit {

  form = new FormGroup({});
  model: FollowUp;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<FollowUpEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: FollowUp,
    private dataHandler: DataHandlerService
  ) {
    if (this.editData.followupId) {
      this.isEdit = true;
    }
    this.fields = FollowUpMetadata.formFields;
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

  get httpRequest(): Observable<FollowUp> {
    if (this.isEdit) {
      return this.dataHandler.put<FollowUp>(FollowUpMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<FollowUp>(FollowUpMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
