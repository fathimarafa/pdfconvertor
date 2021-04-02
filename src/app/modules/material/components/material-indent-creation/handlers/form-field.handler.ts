import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static forms: FormlyFieldConfig[];

    static initialize(form: FormlyFieldConfig[]) {
        this.forms = form;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get materialDropdown() {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'materialId');
    }

    static get supplierDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'supplierPreferred');
    }


}