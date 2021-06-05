import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static projectFields: FormlyFieldConfig[];
    private static transferChargeFields: FormlyFieldConfig[];

    static initialize(projectFields: FormlyFieldConfig[], transferChargeFields: FormlyFieldConfig[]) {
        this.projectFields = projectFields;
        this.transferChargeFields = transferChargeFields;
    }

    static get projectToDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdTo');
    }

    static get blockToDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdTo');
    }

    static get floorToDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdTo');
    }

    static get unitToDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdTo');
    }

}