import { FormlyFieldConfig } from '@ngx-formly/core';

export interface StepType {
    id: string;
    label: string;
    fields: FormlyFieldConfig[];
}

export class FormfieldHandler {

    private static steps: StepType[];

    static initialize(steps: StepType[]) {
        this.steps = steps;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.steps.find(e => e.id === 'client-details')
            .fields.find(e => e.id === 'row-1')
            .fieldGroup.find(e => e.key === 'projectId')
    }

    static get bankDropdown() {
        return this.steps.find(e => e.id === 'payment-details')
            .fields.find(e => e.id === 'row-1')
            .fieldGroup.find(e => e.key === 'paymentId')
    }

    static get currentReceiptAmountInputbox() {
        return this.steps.find(e => e.id === 'bill-details')
            .fields.find(e => e.id === 'row-1')
            .fieldGroup.find(e => e.id === 'row-2')
            .fieldGroup.find(e => e.key === 'amount')
    }

    static get discountAmountInputbox() {
        return this.steps.find(e => e.id === 'bill-details')
            .fields.find(e => e.id === 'row-1')
            .fieldGroup.find(e => e.id === 'row-2')
            .fieldGroup.find(e => e.key === 'discount')
    }

}