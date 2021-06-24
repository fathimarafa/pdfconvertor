import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static projectFields: FormlyFieldConfig[];
    private static evaluationFields: FormlyFieldConfig[];

    static initialize(projectFields: FormlyFieldConfig[], evaluationFields: FormlyFieldConfig[]) {
        this.projectFields = projectFields;
        this.evaluationFields = evaluationFields;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.projectFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get waterElectricityChargePerInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'waterElectricityCharge');
    }

    static get waterElectricityChargeAmtInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'waterElectricityChargeAmt');
    }

    static get labourAdditionalChargePerInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalCharge');
    }

    static get labourAdditionalChargeAmtInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalChargeAmt');
    }

    static get subcontractAdditionalChargePerInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalCharge');
    }

    static get subcontractAdditionalChargeAmtInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalChargeAmt');
    }

    static get otherExpenseAmtInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'other_expense');
    }

    static get contractorProfitPerInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'contractorProfit');
    }

    static get contractorProfitAmtInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'contractorProfitAmt');
    }

    static get taxPerInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'tax');
    }

    static get taxAmountInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'taxAmount');
    }

    static get netAmountInputBox(): FormlyFieldConfig {
        return this.evaluationFields
            .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'netamount');
    }



}