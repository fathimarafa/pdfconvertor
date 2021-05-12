import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ProjectBookingMetadata } from '../project-booking.configuration';
// import { ProjectEnquiry } from '../definitions/project-enquiry.definition';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectMetadata } from '../../project/project.configuration';
import { Project } from '../../project/definitions/project.definition';
import { OwnProjectMetadata } from '../../project/edit/own-project/own-project.configuration';
import { OwnProject } from '../../project/edit/own-project/definitions/own-project.definition';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectBooking } from '../defintions/project-booking.definition';

// enum StepperId {
//   projectDetails = 'project-details',
//   clientDetails = 'client-details',
//   clientStageDetails = 'client-stage-work',
//   bankStageDetails = 'bank-stage-work'
// }

export interface StepType {
  id: string;
  label: string;
  fields: FormlyFieldConfig[];
}
@Component({
  selector: 'app-project-booking-edit',
  templateUrl: './project-booking-edit.component.html',
  styleUrls: ['./project-booking-edit.component.css']
})
export class ProjectBookingEditComponent implements OnInit {

  activedStep = 0;
  model;
  steps: StepType[];
  form: FormArray;
  options: FormlyFormOptions[];
  isEdit: boolean;

  tableColumns;
  dataSource;

  stageTableColumns;
  stageTableDatasource = {};

  bankStageForm;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  enableStageRowEdit;

  ownprojects;

  clientForm = {
    coApplicant: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: ProjectBookingMetadata.coapplicantFormfields
    },
    contribution: {
      form: new FormGroup({}),
      model: {},
      options: {},
      fields: ProjectBookingMetadata.contributionFormfields
    }
  }

  stageModel = {};

  constructor(
    private dialogRef: MatDialogRef<ProjectBookingEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ProjectBooking,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }

    this.model = this.editData;

    this.tableColumns = ProjectBookingMetadata.unitTableColumns;
    this.tableColumns[0].displayName = '';

    this.stageTableColumns = ProjectBookingMetadata.stageTableColumns;

  }

  get dataColumns() {
    if (this.tableColumns && this.tableColumns.length) {
      return this.tableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get stageDataColumns() {
    if (this.stageTableColumns && this.stageTableColumns.length) {
      return this.stageTableColumns.map(col => col.field);
    } else {
      return [];
    }
  }

  ngOnInit(): void {

    const projectBookingForm = JSON.parse(JSON.stringify(ProjectBookingMetadata.formFields));
    const bankStageFormIndex = projectBookingForm.findIndex(e => e.id === 'bank-stage-work');
    this.bankStageForm = projectBookingForm.splice(bankStageFormIndex, 1);
    this.steps = projectBookingForm;

    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});

    this.fetchProjectSelectOptions();

    this.bindClientCoApplicantData();

    this.listenBankContributionFieldChange();

  }

  bindClientCoApplicantData() {
    const data = {
      coApplicantName: this.editData.coApplicantName || '',
      coApplicantAddress: this.editData.coApplicantAddress || '',
      relationship: this.editData.relationship || '',
      coApplicantSex: this.editData.coApplicantSex || '',
      coapplicantDateOfBirth: this.editData.coapplicantDateOfBirth || null
    }
    this.clientForm.coApplicant.model = data;
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  onSaveBtnClick() {
    if (this.form.valid) {
      this.projectBookingHttpRequest.subscribe((res) => {
        const closeEvent: IDialogEvent = {
          action: this.isEdit ? DialogActions.edit : DialogActions.add,
          data: res || this.model
        }
        this.dialogRef.close(closeEvent);
      })
      // this.stageHttpRequest.subscribe((res) => {

      // })
    }
  }

  ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
      let domStyle = cdkDom[0]['style'];
      domStyle.maxWidth = '90vw';
      domStyle.height = '94vh';
    }
  }

  onCancelBtnClick() {
    this.dialogRef.close();
  }

  get projectBookingHttpRequest(): Observable<any> {
    if (this.isEdit) {
      return this.dataHandler.put<any>(ProjectBookingMetadata.serviceEndPoint, this.model);
    } else {
      const defaultDummyFields = {
        companyId: 1,
        branchId: 1,
        userId: 1
      }
      return this.dataHandler.post<any>(ProjectBookingMetadata.serviceEndPoint, { ...this.model, ...this.clientForm.coApplicant.model, ...defaultDummyFields });
    }
  }

  get stageHttpRequest(): Observable<any> {
    let dataRows = [];
    for (let x in this.stageTableDatasource) {
      dataRows = dataRows.concat(this.stageTableDatasource[x].data)
    }
    let endpoint: string = ProjectBookingMetadata.serviceEndPoint;
    endpoint = endpoint.replace('ProjectBooking', 'ProjectStage');
    if (this.isEdit) {
      return this.dataHandler.put<any>(endpoint, dataRows);
    } else {
      return this.dataHandler.post<any>(endpoint, dataRows);
    }
  }

  private fetchProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.ownprojects = res.filter(e => e.projectTypeId === 'OP');
        this.projectDropdown.templateOptions.options = this.ownprojects.map((e: Project) => (
          {
            label: e.projectName,
            value: e.id
          }
        ));
        if (this.isEdit) {
          this.onProjectChange(this.model.projectId);
        }
        this.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
          this.onProjectChange(event.value);
        }
      }
    });
  }

  onProjectChange(projectId) {
    const selectedProject: Project = this.ownprojects.find(e => e.id === projectId);
    if (selectedProject) {
      const projectData = {
        projectName: selectedProject.projectName,
        projectDescription: selectedProject.projectDescription,
        gst_No: selectedProject['gsT_No'],
        enquiryId: selectedProject['enquiryId']
      }
      this.model = { ...this.model, ...projectData }
    }
    this.fetchProjectUnits(projectId);
  }

  private get projectDropdown(): FormlyFieldConfig {
    return this.steps.find(e => e.id === 'project-details').fields
      .find((x: FormlyFieldConfig) => x.key === 'projectId');
  }

  fetchProjectUnits(projectId: string) {
    const endpoint = `${OwnProjectMetadata.serviceEndPoint}/${projectId}`;
    this.dataHandler.get<OwnProject[]>(endpoint).subscribe((res: OwnProject[]) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        if (this.isEdit) {
          const indexToUpdate = res.findIndex(e => e.id === this.model.id);
          if (indexToUpdate > -1) {
            this.onRowSelection(res[indexToUpdate]);
          }
        }
      }
    });
  }

  onRowSelection(selected: OwnProject) {
    this.model.id = selected.id;
    this.dataSource.data.forEach((row) => {
      row.id === selected.id ? row.isSelected = true : row.isSelected = false;
    });
    this.dataSource._updateChangeSubscription();
    this.bindClientContribution(selected);
  }

  bindClientContribution(selected: OwnProject) {
    const clientContributionData = {
      projectId: selected.projectId,
      unitId: selected.unitId,
      totalAmount: selected.totalAmount,
      clientPer: 100,
      clientAmount: selected.totalAmount
    }
    this.clientForm.contribution.model = { ...clientContributionData }
  }

  listenBankContributionFieldChange() {
    this.bankPerInputField.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const bankPer = this.clientForm.contribution.model['bankPer'];
      const bankAmount = this.clientForm.contribution.model['totalAmount'] * (bankPer / 100);
      this.calculateContribution(bankPer, bankAmount);
    }
    this.bankAmountInputField.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const bankAmount = this.clientForm.contribution.model['bankAmount'];
      const bankPer = (bankAmount / this.clientForm.contribution.model['totalAmount']) * 100;
      this.calculateContribution(bankPer, bankAmount);
    }
  }

  calculateContribution(bankPer: number, bankAmount: number) {
    const contributionData = {
      bankPer: bankPer,
      bankAmount: bankAmount,
      clientPer: 100 - bankPer,
      clientAmount: this.clientForm.contribution.model['totalAmount'] - bankAmount
    }
    this.clientForm.contribution.model = { ...this.clientForm.contribution.model, ...contributionData };
    this.showHideBankStageForm();
  }

  showHideBankStageForm() {
    const showForm = this.clientForm.contribution.model['bankAmount'] || this.clientForm.contribution.model['bankPer'];
    const formIndex = this.steps.findIndex(e => e.id === 'bank-stage-work');
    if (showForm && formIndex < 0) {
      this.steps.push(this.bankStageForm[0]);
    }
    if (!showForm && formIndex > -1) {
      this.steps.splice(formIndex, 1);
    }
  }

  private get bankPerInputField(): FormlyFieldConfig {
    return this.clientForm.contribution.fields
      .find((x: FormlyFieldConfig) => x.key === 'bankPer');
  }

  private get bankAmountInputField(): FormlyFieldConfig {
    return this.clientForm.contribution.fields
      .find((x: FormlyFieldConfig) => x.key === 'bankAmount');
  }


  onAddStageBtnClick(id, form) {
    if (form.valid) {
      if (!this.stageTableDatasource[id]) {
        this.stageTableDatasource[id] = new MatTableDataSource([])
      }
      form.value.stageStatusId = 1;
      form.value.stageType = id.split('-')[0];
      form.value.ownProjectDetailsiId = this.model.id;
      this.stageTableDatasource[id].data.push(form.value);
      this.stageTableDatasource[id]._updateChangeSubscription();
      // this.form.reset();
    }
  }

  onEditStageTableRowBtnClick(rowData) {
    this.enableStageRowEdit = true;
    this.model = rowData;
  }

  onCancelStageUpdateBtnClick(form) {
    this.enableStageRowEdit = false;
    // form.reset();
  }

  onDeleteStageTableRowBtnClick(stageId, rowIndex) {
    this.stageTableDatasource[stageId].data.splice(rowIndex, 1);
    this.stageTableDatasource[stageId]._updateChangeSubscription();
  }

  ngOnDestroy() {
    this.form.reset();
  }

}
