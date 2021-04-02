import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static forms: FormlyFieldConfig[];

    static initialize(form: FormlyFieldConfig[]) {
        this.forms = form;
    }

    static get accountTypeDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'accountTypeId');
    }

    static get accountGroupDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'accountGroupId');
    }

    static get accountSubGroupDropdown(): FormlyFieldConfig {
        return this.forms
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'accountSubGroupId');
    }


}