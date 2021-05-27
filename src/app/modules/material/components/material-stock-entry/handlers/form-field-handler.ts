import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static forms;

    static initialize(form) {
        this.forms = form;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get supplierDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'supplierPreferred');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

}