import { FormlyFieldConfig } from '@ngx-formly/core';
import { StepType } from '../edit/part-bill-edit.component';

export class FormfieldHandler {

    private static billDetailFields: StepType[];

    static initialize(billDetailFields: StepType[]) {
        this.billDetailFields = billDetailFields;
    }

    static get partbillTaxTypeDropdown(): FormlyFieldConfig {
        return this.billDetailFields.find(e => e.id === 'bill-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'taxTypeId');
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.billDetailFields.find(e => e.id === 'bill-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.billDetailFields.find(e => e.id === 'bill-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.billDetailFields.find(e => e.id === 'bill-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.billDetailFields.find(e => e.id === 'bill-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

}