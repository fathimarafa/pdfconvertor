import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static forms;

    static initialize(form) {
        this.forms = form;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get supplierDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'supplierId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get workCategoryDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'category');
    }

    static get sitemanagerDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'siteManagerId');
    }

    static get taxAreaDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'taxarea');
    }

    

}