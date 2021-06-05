import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {

    private static transferFields: FormlyFieldConfig[];
    private static transferChargeFields: FormlyFieldConfig[];

    static initialize(transferFields: FormlyFieldConfig[], transferChargeFields: FormlyFieldConfig[]) {
        this.transferFields = transferFields;
        this.transferChargeFields = transferChargeFields;
    }

    static get projectFromDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdFrom');
    }

    static get blockFromDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdFrom');
    }

    static get floorFromDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdFrom');
    }

    static get unitFromDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdFrom');
    }

    static get projectToDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectIdTo');
    }

    static get blockToDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockIdTo');
    }

    static get floorToDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorIdTo');
    }

    static get unitToDropdown(): FormlyFieldConfig {
        return this.transferFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitIdTo');
    }

    static get transportChargeAmtInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'transportationCharge');
    }

    static get transportChargePerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'transportationPer');
    }

    static get loadingChargeAmtInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'loadingUnloadingCharge');
    }

    static get loadingChargePerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'loadingUnloadingPer');
    }

    static get otherChargeAmtInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'otherCharges');
    }

    static get otherChargePerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'otherChargesPer');
    }

    static get miscellaneousExpenseAmtInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'miscellaneousExpense');
    }

    static get miscellaneousExpensePerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'miscellaneousExpensePer');
    }

    static get netAmountInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'netAmount');
    }

}