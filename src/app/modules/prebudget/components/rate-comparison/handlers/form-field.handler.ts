import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static fields: FormlyFieldConfig[];

    static initialize(fields: FormlyFieldConfig[]) {
        this.fields = fields;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.fields.find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

}