import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataHandlerService } from '../../../../../services/datahandler/datahandler.service';
import { ProjectDivisionService } from '../../../../../services/project-division-service/project-division.service';
import { ProjectMetadata } from '../../../../crm/components/project/project.configuration';
import { Project } from '../../../../crm/components/project/definitions/project.definition';
import { ProjectDivisionFields } from '../../../../../services/project-division-fields-handler/project-division-fields-handler.service';

@Injectable({
    providedIn: 'root'
})

export class ReceivedToProjectDivision {

    private fields: ProjectDivisionFields<any>;
    private projectDivision: number;

    constructor(
        private projectDivisionService: ProjectDivisionService,
        private dataHandler: DataHandlerService
    ) { }

    initialize(controllerBasedFields: ProjectDivisionFields<any>) {
        this.fields = controllerBasedFields;
        this.fetchProjectSelectOptions();
        if (this.fields.isEdit && this.fields.model.projectIdTo) {
            this.fetchProjectDivison(this.fields.model.projectIdTo);
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
        this.projectDivisionService.getOwnProjectUnit(this.fields.model.projectIdTo)
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
        this.projectDivisionService.getBlock(this.fields.model.projectIdTo)
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
        this.projectDivisionService.getFloor(this.fields.model.projectIdTo, this.fields.model.blockIdTo)
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
        if (this.fields.model.projectIdTo > -1 && this.fields.model.blockIdTo > -1 && this.fields.model.floorIdTo > -1) {
            this.projectDivisionService.getUnit(this.fields.model.projectIdTo, this.fields.model.blockIdTo, this.fields.model.floorIdTo)
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
                this.fields.unitDropdown.hideExpression = true;
                this.fields.blockDropdown.hideExpression = true;
                this.fields.floorDropdown.hideExpression = true;
                break;
            case 2:
                this.fields.unitDropdown.hideExpression = false;
                this.fields.blockDropdown.hideExpression = true;
                this.fields.floorDropdown.hideExpression = true;
                break;
            case 3:
                this.fields.unitDropdown.hideExpression = false;
                this.fields.blockDropdown.hideExpression = false;
                this.fields.floorDropdown.hideExpression = false;
                break;
            case 4:
                this.fields.unitDropdown.hideExpression = true;
                this.fields.blockDropdown.hideExpression = false;
                this.fields.floorDropdown.hideExpression = false;
                break;
        }
    }

    setProjectDivisionFieldsDefaultValue() {
        switch (this.projectDivision) {
            case 1:
                this.fields.model.blockIdTo = 0;
                this.fields.model.floorIdTo = 0;
                this.fields.model.unitIdTo = 0;
                break;
            case 2:
                this.fields.model.blockIdTo = 0;
                this.fields.model.floorIdTo = 0;
                break;
            case 4:
                this.fields.model.unitIdTo = 0;
                break;
        }
    }


}