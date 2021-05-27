import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static formFields: FormlyFieldConfig[];

    static initialize(formFields: FormlyFieldConfig[]) {
        this.formFields = formFields;
    }

    static get quotationTypeDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'quotationType');
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get materialDropdown() {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'materialId');
    }

    static get termsAndConditionDropdown() {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'termsAndCondition');
    }


}