import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TeamMetadata } from '../team.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { Team } from '../definitions/team.definitions';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { UserMetadata } from '../../user/user.configuration';
import { User } from '../../user/definitions/user.definition';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  form = new FormGroup({});
  model: Team;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  payload;

  constructor(
    private dialogRef: MatDialogRef<TeamEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Team,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = TeamMetadata.formFields;
    this.setUserSelectOptions();
    this.model = this.editData;
    if (this.isEdit) {
      this.model['teamMembers'] = this.model.teamDetails.map(e => e.userId);
    }
  }

  setUserSelectOptions() {
    this.dataHandler.get<User[]>(UserMetadata.serviceEndPoint).subscribe((res: User[]) => {
      if (res) {
        const index = this.fields.findIndex((field: FormlyFieldConfig) => field.key === 'teamMembers');
        if (index !== -1) {
          this.fields[index].templateOptions.options = res.map((e: User) => (
            { label: e.fullName, value: e.id }
          ));
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
          data: this.payload[0]
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get httpRequest(): Observable<Team> {
    this.payload = this.definePayload();
    if (this.isEdit) {
      return this.dataHandler.put<Team>(TeamMetadata.serviceEndPoint, this.payload);
    } else {
      return this.dataHandler.post<Team>(TeamMetadata.serviceEndPoint, this.payload);
    }
  }

  definePayload() {
    const payload = {
      id: this.model.id,
      teamName: this.model.teamName,
      companyId: this.model.companyId || 1,
      branchId: this.model.branchId || 1,
      entryUserId: this.model.entryUserId || 1,
      teamDetails: this.model.teamMembers.map((e) => {
        return { userId: e }
      })
    }
    if (!this.isEdit) delete payload.id;
    return [payload];
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
