import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { GovernmentProjectMetadata } from './govt-project.configuration';
import { GovernmentProject } from './definitions/govt-project.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { Project } from '../../definitions/project.definition';
import { ProjectMetadata } from '../../project.configuration';

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
  model: Project;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<GovernmentProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: Project,
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

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.projectHttpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
    }
  }

  get projectHttpRequest(): Observable<Project> {
    if (this.isEdit) {
      return this.dataHandler.put<Project>(ProjectMetadata.serviceEndPoint, this.model);
    } else {
      // this.model.projectTypeId = 'CG';
      this.model.departmentId = 2;
      return this.dataHandler.post<Project>(ProjectMetadata.serviceEndPoint, this.model);
    }
  }

}

