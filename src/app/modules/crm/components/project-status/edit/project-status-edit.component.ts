import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectStatusMetadata } from '../project-status.configuration';
import { ProjectStatus, ProjectStatusTypes } from '../definitions/project-status.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../project/definitions/project.definition';
import { ProjectMetadata } from '../../project/project.configuration';

export interface StepType {
  id?: string;
  label?: string;
  fields?: FormlyFieldConfig[];
}
@Component({
  selector: 'app-project-status-edit',
  templateUrl: './project-status-edit.component.html',
  styleUrls: ['./project-status-edit.component.css']
})
export class ProjectStatusEditComponent implements OnInit {

  activedStep = 0;
  model;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;

  tableColumns = ProjectStatusMetadata.tenderopenTableColumn;
  tenderAnalysisDataSource = new MatTableDataSource([]);
  tenderNegotiationDataSource = new MatTableDataSource([]);

  addTenderAnalysis(stepIndex) {
    if (this.form.controls[stepIndex].valid) {
      this.tenderAnalysisDataSource.data.push(Object.assign({}, this.form.controls[stepIndex].value));
      this.tenderAnalysisDataSource._updateChangeSubscription();
      // this.options[stepIndex].resetModel();
      // this.form.clearValidators();
    }
  }

  constructor(
    private dialogRef: MatDialogRef<ProjectStatusEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    let projectTypes = {
      'OP': 'Own Project',
      'CP': 'Private Project',
      'CN': 'Consultancy',
      'CG': 'Government Project'
    }
    this.model = {
      projectType: projectTypes[this.editData.projectTypeId],
      projectId: this.editData.projectId,
      projectName: this.editData.projectName,
      currentStatus: this.editData.status
    }
    this.model.userId = 1;

  }

  ngOnInit(): void {
    this.steps = ProjectStatusMetadata.formFields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    this.bindStatusSelectOptions();
  }

  bindStatusSelectOptions() {
    this.changeStatusDropdown.templateOptions.options = ProjectStatusTypes.filter(e => e.value > (this.editData.projectTypeId === 'CG' ? 1 : 5));;
    this.listenStatusChangeEvent();
  }

  listenStatusChangeEvent() {
    this.changeStatusDropdown.templateOptions.change = (field: FormlyFieldConfig, event) => {
      this.steps.splice(1);
      switch (this.model.status) {
        case 2:
          this.steps.push(ProjectStatusMetadata.tendersubmissionFormfields);
          break;
        case 3:
          this.steps.push(ProjectStatusMetadata.tendersubmissionFormfields);
          this.steps.push(ProjectStatusMetadata.tenderopenFormfields);
          break;
        case 4:
          this.steps.push(ProjectStatusMetadata.tendernegotiationFormfields);
          break;
        case 5:
          this.steps.push(ProjectStatusMetadata.workorderFormfields);
          break;
      }
      this.form = new FormArray(this.steps.map(() => new FormGroup({})));
      this.options = this.steps.map(() => <FormlyFormOptions>{});
    }
  }


  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

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

  get httpRequest(): Observable<ProjectStatus> {
    return this.dataHandler.put<ProjectStatus>(this.endpointBasedOnProjectType, this.model);
  }

  get endpointBasedOnProjectType() {
    let endpoint: string;
    switch (this.model.status) {
      case 2:
        this.model.projectId = this.editData.id;
        endpoint = ProjectStatusMetadata.serviceEndpoint.tendersubmit;
        break;
      case 3:
        this.model.projectId = this.editData.id;
        endpoint = ProjectStatusMetadata.serviceEndpoint.tenderanalysis;
        break;
      case 4:
        this.model.projectId = this.editData.id;
        endpoint = ProjectStatusMetadata.serviceEndpoint.tendernegotiation;
        break;
      case 5:
        this.model.projectId = this.editData.id;
        endpoint = ProjectStatusMetadata.serviceEndpoint.tenderworkorder;
        break;
      default:
        endpoint = `${ProjectStatusMetadata.serviceEndpoint.status}/${this.editData.id}`
        break;
    }
    return endpoint;
  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnDestroy() {
    this.form.reset();
  }

  private get changeStatusDropdown(): FormlyFieldConfig {
    return this.steps.find(e => e.id === 'projectdetails')
      .fields.find((x: FormlyFieldConfig) => x.id === 'row-3')
      .fieldGroup.find((x: FormlyFieldConfig) => x.key === 'status');
  }

}
