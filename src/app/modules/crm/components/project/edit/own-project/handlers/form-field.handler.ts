import { FormlyFieldConfig } from '@ngx-formly/core';
import { OwnProjectMetadata } from '../own-project.configuration';
import { ProjectFloorRegistrationMetadata } from '../../../../project-floor-registration/project-floor-registration.configuration';
import { Floor } from '../../../../project-floor-registration/definitions/floor.definition';
import { ProjectBlockRegistrationMetadata } from '../../../../project-block-registration/project-block-registration.configuration';
import { Block } from '../../../../project-block-registration/definitions/block.definition';

export class FormfieldHandler {

    private static formFields: FormlyFieldConfig[];
    private static dataproviderService;

    static loadDropdowns(fields: FormlyFieldConfig[], httpservice) {
        this.formFields = fields;
        this.dataproviderService = httpservice;
        this.loadBlockDropdown();
        this.loadFloorDropdown();
        this.loadOwnprojectUnitTypeDropdown();
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get projectUnitTypeDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectCategoryId');
    }

    private static loadBlockDropdown() {
        this.dataproviderService.get(ProjectBlockRegistrationMetadata.serviceEndPoint).subscribe((res: Block[]) => {
            if (res) {
                this.blockDropdown.templateOptions.options = res.map((e: Block) => (
                    {
                        label: e.blockName,
                        value: e.blockId
                    }
                ));
            }
        });
    }

    private static loadFloorDropdown() {
        this.dataproviderService.get(ProjectFloorRegistrationMetadata.serviceEndPoint).subscribe((res: Floor[]) => {
            if (res) {
                this.floorDropdown.templateOptions.options = res.map((e: Floor) => (
                    {
                        label: e.floorName,
                        value: e.floorId
                    }
                ))
            }
        });
    }

    private static loadOwnprojectUnitTypeDropdown() {
        this.dataproviderService.get(`${OwnProjectMetadata.serviceEndPoint}Type`).subscribe((res) => {
            if (res) {
                this.projectUnitTypeDropdown.templateOptions.options = res.map((e) => (
                    {
                        label: e.type,
                        value: e.id
                    }
                )
                )
            }
        });
    }

    /* scalable work area total */

    static get carpetAreaDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'carpetArea');
    }

    static get commonAreaDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'commonArea');
    }

    static get balconyAreaDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'balconyArea');
    }

    static get workAreaDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workArea');
    }

    static get ratePerAreaDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'ratePerArea');
    }

    /* scalable work area total */

    /* terrace total */

    static get privateTerraceDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'privateTerrace');
    }

    static get terraceRateDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'terraceRate');
    }

    static get carParkingDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'carParking');
    }

    /* terrace total */

    /* total area cost with tax */

    static get gstDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'gst');
    }

    static get kfcDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'kfc');
    }

    /* total area cost with tax */

    /* total land cost with tax */

    static get landCostDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'landCost');
    }

    static get landRateDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'landRate');
    }

    static get landgstDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'landgst');
    }

    static get landkfcDropdown(): FormlyFieldConfig {
        return this.formFields.find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'landkfc');
    }

    /* total land cost with tax */



}