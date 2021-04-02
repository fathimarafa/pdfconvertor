import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static forms: FormlyFieldConfig[];

    static initialize(modalForm: FormlyFieldConfig[]) {
        this.forms = modalForm;
    }

    static get projectFromDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdFrom');
    }

    static get blockFromDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdFrom');
    }

    static get floorFromDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdFrom');
    }

    static get unitFromDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdFrom');
    }

    static get projectToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdTo');
    }

    static get blockToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdTo');
    }

    static get floorToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdTo');
    }

    static get unitToDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdTo');
    }

}