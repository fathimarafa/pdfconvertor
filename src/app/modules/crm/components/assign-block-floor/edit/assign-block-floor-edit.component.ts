import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AssignBlockFloorMetadata } from '../assign-block-floor.configuration';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { AssignBlockFloor } from '../definitions/assign-block-floor.definition';
import { IDialogEvent, DialogActions } from '../../../../../definitions/dialog.definitions';
import { Observable } from 'rxjs';
import { ProjectMetadata } from '../../project/project.configuration';
import { Project } from '../../project/definitions/project.definition';
import { ProjectFloorRegistrationMetadata } from '../../project-floor-registration/project-floor-registration.configuration';
import { Floor } from '../../project-floor-registration/definitions/floor.definition';
import { ProjectBlockRegistrationMetadata } from '../../project-block-registration/project-block-registration.configuration';
import { Block } from '../../project-block-registration/definitions/block.definition';

@Component({
  selector: 'app-assign-block-floor-edit',
  templateUrl: './assign-block-floor-edit.component.html',
  styleUrls: ['./assign-block-floor-edit.component.css']
})
export class AssignBlockFloorEditComponent implements OnInit {

  form = new FormGroup({});
  model: AssignBlockFloor;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  isEdit: boolean;

  constructor(
    private dialogRef: MatDialogRef<AssignBlockFloorEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: AssignBlockFloor,
    private dataHandler: DataHandlerService
  ) {
    if (Object.keys(this.editData).length) {
      this.isEdit = true;
    }
    this.fields = AssignBlockFloorMetadata.formFields;
    this.model = this.editData;
    this.bindFormSelectOptions();
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

  get httpRequest(): Observable<AssignBlockFloor> {
    const payload = this.model.floorId.map(e => {
      return {
        IsActive: 1,
        ProjectId: this.model.projectId,
        BlockId: this.model.blockId,
        FloorId: e,
        UserId: 10
      }
    })
    if (this.isEdit) {
      return this.dataHandler.put<AssignBlockFloor>(AssignBlockFloorMetadata.serviceEndPoint, payload);
    } else {
      return this.dataHandler.post<AssignBlockFloor>(AssignBlockFloorMetadata.serviceEndPoint, payload);
    }
  }

  bindFormSelectOptions() {
    this.setProjectSelectOptions();
    this.setBlockSelectOptions();
    this.setFloorSelectOptions();
  }

  setProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        const index = this.fields.findIndex((field: FormlyFieldConfig) => field.key === 'projectId');
        if (index !== -1) {
          this.fields[index].templateOptions.options = res.map((e: Project) => (
            {
              label: e.projectName,
              value: e.id
            }
          ));
        }
      }
    });
  }

  setBlockSelectOptions() {
    this.dataHandler.get<Block[]>(ProjectBlockRegistrationMetadata.serviceEndPoint).subscribe((res: Block[]) => {
      if (res) {
        const index = this.fields.findIndex((field: FormlyFieldConfig) => field.key === 'blockId');
        if (index !== -1) {
          this.fields[index].templateOptions.options = res.map((e: Block) => (
            {
              label: e.blockName,
              value: e.blockId
            }
          )
          )
        }
      }
    });
  }

  setFloorSelectOptions() {
    this.dataHandler.get<Floor[]>(ProjectFloorRegistrationMetadata.serviceEndPoint).subscribe((res: Floor[]) => {
      if (res) {
        const index = this.fields.findIndex((field: FormlyFieldConfig) => field.key === 'floorId');
        if (index !== -1) {
          this.fields[index].templateOptions.options = res.map((e: Floor) => (
            {
              label: e.floorName,
              value: e.floorId
            }
          )
          )
        }
      }
    });
  }

}
