import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static fields: FormlyFieldConfig[];

    static initialize(fields: FormlyFieldConfig[]) {
        this.fields = fields;
    }

    static get refundTypeDropdown(): FormlyFieldConfig {
        for (let row of this.fields) {
            const field = row.fieldGroup.find((x: FormlyFieldConfig) => x.key === 'refundType');
            if (field) return field;
        }
        return {};
    }

    static get projectDropdown(): FormlyFieldConfig {
        for (let row of this.fields) {
            const field = row.fieldGroup.find((x: FormlyFieldConfig) => x.key === 'projectId');
            if (field) return field;
        }
        return {};
    }

    static get refundAmountDropdown(): FormlyFieldConfig {
        for (let row of this.fields) {
            const field = row.fieldGroup.find((x: FormlyFieldConfig) => x.key === 'refundAmount');
            if (field) return field;
        }
        return {};
    }

}