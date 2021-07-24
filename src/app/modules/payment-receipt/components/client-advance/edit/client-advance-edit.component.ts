import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ClientAdvanceMetadata } from '../client-advance.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { ClientAdvance } from '../definitions/client-advance.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable, Subscription } from 'rxjs';
import { FormfieldHandler } from '../handlers/form-field.handler';
import { ProjectDivisionFields, ProjectDivisionFieldsHandlerService } from 'src/app/services/project-division-fields-handler/project-division-fields-handler.service';
import { Project } from 'src/app/modules/crm/components/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/crm/components/project/project.configuration';

@Component({
  selector: 'app-client-advance-edit',
  templateUrl: './client-advance-edit.component.html',
  styleUrls: ['./client-advance-edit.component.css']
})
export class ClientAdvanceEditComponent implements OnInit {

  form = new FormGroup({});
  model: ClientAdvance;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;
  projectList: Project[];
  projectChangeSubscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ClientAdvanceEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: ClientAdvance,
    private dataHandler: DataHandlerService,
    private projectDivisionFieldsHandler: ProjectDivisionFieldsHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = ClientAdvanceMetadata.formFields;
    this.model = this.editData;
  }

  ngOnInit(): void {
    FormfieldHandler.initialize(this.fields);
    this.bindProjectDivisionFields();
    this.getProjectList();
  }

  bindProjectDivisionFields() {
    const projectControllerFields: ProjectDivisionFields<ClientAdvance> = {
      projectDropdown: FormfieldHandler.projectDropdown,
      blockDropdown: FormfieldHandler.blockDropdown,
      floorDropdown: FormfieldHandler.floorDropdown,
      unitDropdown: FormfieldHandler.unitDropdown,
      model: this.model,
      isEdit: this.isEdit,
      broadcastChanges: true
    };
    this.projectDivisionFieldsHandler.initialize(projectControllerFields);
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

  get httpRequest(): Observable<ClientAdvance> {
    this.projectDivisionFieldsHandler.setProjectDivisionFieldsDefaultValue(this.model);
    this.model.withclear = this.model.withclear ? 1 : 0;
    this.model.paymentModeNo = "";
    this.model.approvalStatus = 0;
    this.model.approvalLevel = 0;
    this.model.approvedBy = 0;
    this.model.approvedDate = new Date().toISOString() as unknown as Date;
    this.model.isDeleted = 0;
    this.model.approvalRemarks = '';

    if (this.isEdit) {
      return this.dataHandler.put<ClientAdvance>(ClientAdvanceMetadata.serviceEndPoint, this.model);
    } else {
      return this.dataHandler.post<ClientAdvance>(ClientAdvanceMetadata.serviceEndPoint, this.model);
    }
  }

  getProjectList() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.projectList = res;
        this.listenProjectTypeChange();
        this.listenProjectChange();
      }
    });
  }

  private listenProjectTypeChange() {
    FormfieldHandler.projectTypeDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
      FormfieldHandler.projectDropdown.templateOptions.options = this.projectBasedOnProjectType.map((e: Project) => (
        {
          label: e.projectName,
          value: e.id
        }
      ));
    }
  }

  private listenProjectChange() {
    this.projectChangeSubscription = this.projectDivisionFieldsHandler.listenChange().subscribe(res => {
      const selectedProject: Project = this.projectList.find(e => e.id === res.projectId);
      if (selectedProject) {
        this.model['firstName'] = selectedProject.firstName;
        this.model['lastName'] = selectedProject.lastName;
        this.model['address'] = selectedProject.address;
        this.model = { ...this.model };
      }
    })
  }

  private get projectBasedOnProjectType() {
    return this.projectList.filter(e => e.projectTypeId === this.model['projectType']);
  }

  ngOnDestroy() {
    this.form.reset();
    this.projectDivisionFieldsHandler.clear();
    this.projectChangeSubscription.unsubscribe();
  }

}
