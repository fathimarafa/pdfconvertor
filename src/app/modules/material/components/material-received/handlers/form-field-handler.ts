import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static forms: FormlyFieldConfig[];

    static initialize(modalForm: FormlyFieldConfig[]) {
        this.forms = modalForm;
    }

    static get projectToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdTo');
    }

    static get blockToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdTo');
    }

    static get floorToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdTo');
    }

    static get unitToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdTo');
    }

}