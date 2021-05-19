import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectStageStatusMetadata } from '../project-stage-status.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { ProjectStage } from '../definitions/project-stage-status.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-stage-status-edit',
  templateUrl: './project-stage-status-edit.component.html',
  styleUrls: ['./project-stage-status-edit.component.css']
})
export class ProjectStageStatusEditComponent implements OnInit {

  form = new FormGroup({});
  model: ProjectStage;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProjectStageStatusEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ProjectStage,
    private dataHandler: DataHandlerService
  ) {
    this.isEdit = true;
    this.fields = ProjectStageStatusMetadata.formFields;
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

  get httpRequest(): Observable<ProjectStage> {
    const dummyFinancialYearId = 1;
    const endpoint = `${ProjectStageStatusMetadata.serviceEndPoint}/Status/${dummyFinancialYearId}`;
    return this.dataHandler.put<ProjectStage>(endpoint, [this.model]);
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

}
