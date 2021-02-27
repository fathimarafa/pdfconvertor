import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { UserMetadata } from '../user.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { User } from '../definitions/user.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { UserGroup } from '../../user-group/definitions/user-group.definition';
import { Observable } from 'rxjs';
import { UserGroupMetadata } from '../../user-group/user-group.configuration';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  form = new FormGroup({});
  model: User;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: User,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = UserMetadata.formFields;
    this.setUserGroupSelectOptions();
    this.model = this.editData;
  }

  setUserGroupSelectOptions() {
    this.dataHandler.get<UserGroup[]>(UserGroupMetadata.serviceEndPoint).subscribe((res: UserGroup[]) => {
      if (res) {
        const index = this.fields.findIndex((field: FormlyFieldConfig) => field.key === 'userGroupId');
        if (index !== -1) {
          this.fields[index].templateOptions.options = res.map((e: UserGroup) => (
            {
              label: e.userGroupName,
              value: e.userGroupId
            }
          )
          )
        }
      }
    });
  }

  ngOnInit(): void { }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.isEdit ? this.model : res
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<User> {
    if (this.isEdit) {
      return this.dataHandler.put<User>(UserMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<User>(UserMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
