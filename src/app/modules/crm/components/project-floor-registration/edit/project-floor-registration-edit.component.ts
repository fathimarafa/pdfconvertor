import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectFloorRegistrationMetadata } from '../project-floor-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { Floor } from '../definitions/floor.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-floor-registration-edit',
  templateUrl: './project-floor-registration-edit.component.html',
  styleUrls: ['./project-floor-registration-edit.component.css']
})
export class ProjectFloorRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: Floor;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProjectFloorRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Floor,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = ProjectFloorRegistrationMetadata.formFields;
    this.model = this.editData;
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
      });
    }
  }

  get httpRequest(): Observable<Floor> {
    if (this.isEdit) {
      return this.dataHandler.put<Floor>(ProjectFloorRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<Floor>(ProjectFloorRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
