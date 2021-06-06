import { FormlyFieldConfig } from '@ngx-formly/core';


export class FormfieldHandler {

    private static forms;
    private static transferChargeFields;

    static initialize(form, transferChargeFields) {
        this.forms = form;
        this.transferChargeFields = transferChargeFields;
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

    static get gstAmountInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'gstAmount');
    }

    static get gstPerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'gstPer');
    }

    static get kfcAmountInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'kfcAmount');
    }

    static get kfcPerInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'kfcPer');
    }

    static get sgstInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'sgst');
    }

    static get cgstInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'cgst');
    }

    static get igstInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'igst');
    }

    static get kfcInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'kfc');
    }

    static get amountPaidAdvanceInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'amountPaidAdvance');
    }

    static get billdiscountInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'billdiscount');
    }

    static get netamountInputBox(): FormlyFieldConfig {
        return this.transferChargeFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'netamount');
    }


}