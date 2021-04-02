import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { GovernmentProjectMetadata } from './govt-project.configuration';
import { GovernmentProject } from './definitions/govt-project.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}
@Component({
  selector: 'app-govt-project',
  templateUrl: './govt-project.component.html',
  styleUrls: ['./govt-project.component.css']
})
export class GovernmentProjectComponent implements OnInit {

  activedStep = 0;
  model: GovernmentProject;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<GovernmentProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: GovernmentProject,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.model = this.editData;
    this.model.projectTypeId = 'CG';
  }

  ngOnInit(): void {
    this.steps = GovernmentProjectMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.model.projectId = this.model.projectId || Math.round(Math.random() * 100).toString();
      this.httpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get httpRequest(): Observable<GovernmentProject> {
    if (this.isEdit) {
      // const endPoint = `${GovernmentProjectMetadata.serviceEndPoint}/${this.model.projectId}`;
      return this.dataHandler.put<GovernmentProject>(GovernmentProjectMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<GovernmentProject>(GovernmentProjectMetadata.serviceEndPoint, this.model);
    }
  }

}

