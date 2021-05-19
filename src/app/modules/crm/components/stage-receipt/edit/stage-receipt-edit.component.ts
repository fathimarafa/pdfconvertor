import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { StageReceiptMetadata } from '../stage-receipt.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { StageReceipt } from '../definitions/stage-receipt.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../project/definitions/project.definition';
import { ProjectMetadata } from '../../project/project.configuration';
import { ProjectStage } from '../../project-stage-status/definitions/project-stage-status.definition';
import { ProjectStageStatusMetadata } from '../../project-stage-status/project-stage-status.configuration';

@Component({
  selector: 'app-stage-receipt-edit',
  templateUrl: './stage-receipt-edit.component.html',
  styleUrls: ['./stage-receipt-edit.component.css']
})
export class StageReceiptEditComponent implements OnInit {

  form = new FormGroup({});
  model: StageReceipt;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  amountForm = new FormGroup({});
  amountModel: StageReceipt;
  amountOptions: FormlyFormOptions = {};
  amountFields: FormlyFieldConfig[];

  isEdit: boolean;

  stageTablecolumns = StageReceiptMetadata.stageTableColumns;
  billTablecolumns = StageReceiptMetadata.billTableColumns;

  additionalbillDatasource;
  stageDatasource;

  constructor(
    private dialogRef: MatDialogRef<StageReceiptEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: StageReceipt,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = StageReceiptMetadata.formFields;
    this.model = this.editData;
    this.fetchProjectSelectOptions();

    this.amountFields = StageReceiptMetadata.amountFields;
    this.amountModel = {};
  }

  get billDatacolumns() {
    if (this.billTablecolumns && this.billTablecolumns.length) {
      return this.billTablecolumns.map(col => col.field);
    } else {
      return [];
    }
  }

  get stageDatacolumns() {
    if (this.stageTablecolumns && this.stageTablecolumns.length) {
      return this.stageTablecolumns.map(col => col.field);
    } else {
      return [];
    }
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

  get httpRequest(): Observable<StageReceipt> {
    if (this.isEdit) {
      return this.dataHandler.put<StageReceipt>(StageReceiptMetadata.serviceEndPoint.receipt, this.model);
    } else {
      return this.dataHandler.post<StageReceipt>(StageReceiptMetadata.serviceEndPoint.receipt, this.model);
    }
  }

  projectDataset: Project[];
  private fetchProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.projectDataset = res;
        this.projectDropdown.templateOptions.options = res.map((e: Project) => (
          {
            label: e.projectId,
            value: e.id
          }
        ));
        this.listenProjectChange();
      }
    });
  }

  listenProjectChange() {
    this.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      const selectedProject: Project = this.projectDataset.find(e => e.id === this.model.projectId)
      if (selectedProject) {
        this.loadPendingClientBills();
        this.loadProjectStage();
        this.model['firstName'] = selectedProject.firstName;
        this.model['lastName'] = selectedProject.lastName;
        this.model['phoneNumber'] = selectedProject.phoneNumber;
        this.model['mobileNumber'] = selectedProject.mobileNumber;
        this.model['address'] = selectedProject.address;
        this.model = { ...this.model };
      }
    }
  }

  loadPendingClientBills() {
    const endPoint = `${StageReceiptMetadata.serviceEndPoint.pendingClientBills}/4/${this.model.projectId}/0`;
    this.dataHandler.get(endPoint).subscribe((res: any[]) => {
      this.additionalbillDatasource = new MatTableDataSource(res);
    })
  }

  loadProjectStage() {
    const endPoint = `${ProjectStageStatusMetadata.serviceEndPoint}/${this.model.projectId}`;
    this.dataHandler.get<ProjectStage[]>(endPoint)
      .subscribe((res: ProjectStage[]) => {
        this.stageDatasource = new MatTableDataSource(res);
      });
  }

  private get projectDropdown() {
    return this.fields.find(e => e.id === 'row-1')
      .fieldGroup.find(e => e.key === 'projectId')
  }

  ngOnDestroy() {
    this.form.reset();
  }

  ngAfterViewInit() {
    const cdkDom = document.getElementsByClassName('cdk-overlay-pane');
    if (cdkDom && cdkDom.length) {
      let domStyle = cdkDom[0]['style'];
      // domStyle.maxWidth = '90vw';
      // domStyle.minHeight = '90vh';
      domStyle.minWidth = '95vw'
    }
  }

}
