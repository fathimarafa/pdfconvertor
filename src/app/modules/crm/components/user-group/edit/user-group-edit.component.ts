import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserGroupMetadata } from '../user-group.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { UserGroup } from '../definitions/user-group.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.css']
})
export class UserGroupEditComponent implements OnInit {

  form = new FormGroup({});
  model: UserGroup;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<UserGroupEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: UserGroup,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = UserGroupMetadata.formFields;
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

  get httpRequest(): Observable<UserGroup> {
    if (this.isEdit) {
      return this.dataHandler.put<UserGroup>(UserGroupMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<UserGroup>(UserGroupMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
