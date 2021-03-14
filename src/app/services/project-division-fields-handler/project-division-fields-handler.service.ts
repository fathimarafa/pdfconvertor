import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, Subject } from 'rxjs';
import { Project } from 'src/app/modules/feature/project/definitions/project.definition';
import { ProjectMetadata } from 'src/app/modules/feature/project/project.configuration';
import { DataHandlerService } from '../datahandler/datahandler.service';
import { ProjectDivisionService } from '../project-division-service/project-division.service';

export interface ProjectDivisionFields<T> {
  projectDropdown: FormlyFieldConfig;
  blockDropdown: FormlyFieldConfig;
  floorDropdown: FormlyFieldConfig;
  unitDropdown: FormlyFieldConfig;
  model: T;
  isEdit: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ProjectDivisionFieldsHandlerService {

  private fields: ProjectDivisionFields<any>;
  private projectDivision: number;
  private isBlockFloorLoaded: boolean;
  private onProjectDivisionChange: Subject<number>;

  constructor(
    private projectDivisionService: ProjectDivisionService,
    private dataHandler: DataHandlerService
  ) {
    this.onProjectDivisionChange = new Subject<number>();
  }

  initialize(controllerBasedFields: ProjectDivisionFields<any>) {
    this.fields = controllerBasedFields;
    this.fetchProjectSelectOptions();
    if (this.fields.isEdit && this.fields.model.projectId) {
      this.fetchProjectDivison(this.fields.model.projectId);
    }
  }

  clear() {
    this.fields = undefined;
    this.projectDivision = null;
    this.isBlockFloorLoaded = false;
  }

  get listenProjectDivisionChange(): Observable<number> {
    return this.onProjectDivisionChange.asObservable();
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
        if (!this.isBlockFloorLoaded) {
          this.fetchBlockFloor();
          this.isBlockFloorLoaded = true;
        }
        if (currentDivision === 3) {
          this.fetchFloorUnit();
        }
      }
      if (currentDivision === 2) {
        this.fetchProjectDivisionUnit();
      }
      this.projectDivision = currentDivision;
      this.onProjectDivisionChange.next(this.projectDivision);
    }
  }

  private fetchProjectDivisionUnit() {
    this.projectDivisionService.getOwnProjectUnit(this.fields.model.projectId)
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
    this.projectDivisionService.getBlock(this.fields.model.projectId)
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
    this.projectDivisionService.getFloor(this.fields.model.projectId, this.fields.model.blockId)
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
    if (this.fields.model.projectId > -1 && this.fields.model.blockId > -1 && this.fields.model.floorId > -1) {
      this.projectDivisionService.getUnit(this.fields.model.projectId, this.fields.model.blockId, this.fields.model.floorId)
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

  setProjectDivisionFieldsDefaultValue() {
    switch (this.projectDivision) {
      case 1:
        this.fields.model.blockId = 0;
        this.fields.model.floorId = 0;
        this.fields.model.unitId = 0;
        break;
      case 2:
        this.fields.model.blockId = 0;
        this.fields.model.floorId = 0;
        break;
      case 4:
        this.fields.model.unitId = 0;
        break;
    }
  }


}