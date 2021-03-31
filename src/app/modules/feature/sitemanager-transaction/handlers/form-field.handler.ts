import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static forms: FormlyFieldConfig[];

    static initialize(fields: FormlyFieldConfig[]) {
        this.forms = fields;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get sitemanagerDropdown() {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'employeeId');
    }

    // static get documentTypeDropdown() {
    //     return this.forms
    //         .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'documentTypeId');
    // }

}