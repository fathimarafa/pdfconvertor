import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static fields: FormlyFieldConfig[];

    static initialize(fields: FormlyFieldConfig[]) {
        this.fields = fields;
    }

    static get projectTypeDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectType');
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get bankDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'paymentModeId');
    }

    static get tdsPerInputbox(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'tdsAmountPer');
    }

}