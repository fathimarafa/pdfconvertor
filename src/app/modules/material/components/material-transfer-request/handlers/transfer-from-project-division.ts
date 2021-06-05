import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { ProjectDivisionService } from '../../../../../services/project-division-service/project-division.service';
import { ProjectMetadata } from '../../../../crm/components/project/project.configuration';
import { Project } from '../../../../crm/components/project/definitions/project.definition';
import { ProjectDivisionFields } from '../definitions/material-transfer-request.definition';

@Injectable({
  providedIn: 'root'
})

export class TransferFromProjectDivision {

  private fields: ProjectDivisionFields<any>;
  private projectDivision: number;

  constructor(
    private projectDivisionService: ProjectDivisionService,
    private dataHandler: DataHandlerService
  ) { }

  initialize(controllerBasedFields: ProjectDivisionFields<any>) {
    this.fields = controllerBasedFields;
    this.fetchProjectSelectOptions();
    if (this.fields.isEdit && this.fields.model.projectIdFrom) {
      this.fetchProjectDivison(this.fields.model.projectIdFrom);
    }
  }

  clear() {
    this.fields = undefined;
    this.projectDivision = null;
  }

  private fetchProjectSelectOptions() {
    this.dataHandler.get<Project[]>(ProjectMetadata.serviceEndPoint).subscribe((res: Project[]) => {
      if (res) {
        this.fields.projectDropdown.templateOptions.options = res.map((e: Project) => (
          {
            label: e.projectName,
            value: e.id
          }
        ));
        this.fields.projectDropdown.templateOptions.change = (field: FormlyFieldConfig, event: any) => {
          this.fetchProjectDivison(event.value);
        }
      }
    });
  }

  private fetchProjectDivison(projectId: number) {
    this.projectDivisionService.getProjectDivisionController(projectId)
      .subscribe((res: number) => {
        this.fetchBlockFloorUnit(res);
      })
  }

  private fetchBlockFloorUnit(currentDivision: number) {
    if (this.projectDivision !== currentDivision) {
      this.fields.unitDropdown.templateOptions.options = [];
      if (currentDivision === 3 || currentDivision === 4) {
        this.fetchBlockFloor();
        if (currentDivision === 3) {
          this.fetchFloorUnit();
        }
      }
      if (currentDivision === 2) {
        this.fetchProjectDivisionUnit();
      }
      this.projectDivision = currentDivision;
      this.showHideProjectDivisionBasedFields();
    }
  }

  private fetchProjectDivisionUnit() {
    this.projectDivisionService.getOwnProjectUnit(this.fields.model.projectIdFrom)
      .subscribe((res) => {
        this.fields.unitDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.unitId,
            value: e.id
          }
        ));
      })
  }

  private fetchBlockFloor() {
    this.projectDivisionService.getBlock(this.fields.model.projectIdFrom)
      .subscribe((res) => {
        this.fields.blockDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.blockName,
            value: e.blockId
          }
        ));
        this.fields.blockDropdown.templateOptions.change = (field, event) => {
          this.fetchFloor();
        }
      });
    if (this.fields.isEdit) {
      this.fetchFloor();
    }
  }

  private fetchFloor() {
    this.projectDivisionService.getFloor(this.fields.model.projectIdFrom, this.fields.model.blockIdFrom)
      .subscribe((res) => {
        this.fields.floorDropdown.templateOptions.options = res.map((e) => (
          {
            label: e.floorName,
            value: e.floorId
          }
        ));
        this.fields.floorDropdown.templateOptions.change = (field, event) => {
          if (this.projectDivision === 3) {
            this.fetchFloorUnit();
          }
        }
      });
  }

  private fetchFloorUnit() {
    if (this.fields.model.projectIdFrom > -1 && this.fields.model.blockIdFrom > -1 && this.fields.model.floorIdFrom > -1) {
      this.projectDivisionService.getUnit(this.fields.model.projectIdFrom, this.fields.model.blockIdFrom, this.fields.model.floorIdFrom)
        .subscribe((res) => {
          this.fields.unitDropdown.templateOptions.options = res.map((e) => (
            {
              label: e.unitName,
              value: e.unitId
            }
          ));
        })
    }
  }

  private showHideProjectDivisionBasedFields() {
    switch (this.projectDivision) {
      case 1:
        this.fields.unitDropdown.templateOptions.disabled = true;
        this.fields.unitDropdown.className = 'flex-1 readonly';
        this.fields.blockDropdown.templateOptions.disabled = true;
        this.fields.blockDropdown.className = 'flex-1 readonly';
        this.fields.floorDropdown.templateOptions.disabled = true;
        this.fields.floorDropdown.className = 'flex-1 readonly';
        break;
      case 2:
        this.fields.unitDropdown.templateOptions.disabled = false;
        this.fields.unitDropdown.className = 'flex-1';
        this.fields.blockDropdown.templateOptions.disabled = true;
        this.fields.blockDropdown.className = 'flex-1 readonly';
        this.fields.floorDropdown.templateOptions.disabled = true;
        this.fields.floorDropdown.className = 'flex-1 readonly';
        break;
      case 3:
        this.fields.unitDropdown.templateOptions.disabled = false;
        this.fields.unitDropdown.className = 'flex-1';
        this.fields.blockDropdown.templateOptions.disabled = false;
        this.fields.blockDropdown.className = 'flex-1';
        this.fields.floorDropdown.templateOptions.disabled = false;
        this.fields.floorDropdown.className = 'flex-1';
        break;
      case 4:
        this.fields.unitDropdown.templateOptions.disabled = true;
        this.fields.unitDropdown.className = 'flex-1 readonly';
        this.fields.blockDropdown.templateOptions.disabled = false;
        this.fields.blockDropdown.className = 'flex-1';
        this.fields.floorDropdown.templateOptions.disabled = false;
        this.fields.floorDropdown.className = 'flex-1';
        break;
    }
  }

  setProjectDivisionFieldsDefaultValue() {
    switch (this.projectDivision) {
      case 1:
        this.fields.model.blockIdFrom = 0;
        this.fields.model.floorIdFrom = 0;
        this.fields.model.unitIdFrom = 0;
        break;
      case 2:
        this.fields.model.blockIdFrom = 0;
        this.fields.model.floorIdFrom = 0;
        break;
      case 4:
        this.fields.model.unitIdFrom = 0;
        break;
    }
  }


}