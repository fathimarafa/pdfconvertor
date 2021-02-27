import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectBlockRegistrationMetadata } from '../project-block-registration.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../services/datahandler/datahandler.service';
import { Block } from '../definitions/block.definition';
import { IDialogEvent, DialogActions } from '../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-block-registration-edit',
  templateUrl: './project-block-registration-edit.component.html',
  styleUrls: ['./project-block-registration-edit.component.css']
})
export class ProjectBlockRegistrationEditComponent implements OnInit {

  form = new FormGroup({});
  model: Block;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProjectBlockRegistrationEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Block,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = ProjectBlockRegistrationMetadata.formFields;
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

  get httpRequest(): Observable<Block> {
    if (this.isEdit) {
      return this.dataHandler.put<Block>(ProjectBlockRegistrationMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<Block>(ProjectBlockRegistrationMetadata.serviceEndPoint, this.model);
    }
  }

}
