import { FormlyFieldConfig } from '@ngx-formly/core';

export interface ModalFormFields {
    issued: FormlyFieldConfig[];
    usage: FormlyFieldConfig[];
}

// export class FormfieldHandler {

//     private static forms: ModalFormFields;

//     static initialize(modalForm: ModalFormFields) {
//         this.forms = modalForm;
//     }

export class FormfieldHandler {

    private static forms;
    private static detailsFields;

    static initialize(form, detailsFields) {
        this.forms = form;
        this.detailsFields = detailsFields;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }


    static get blockDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }


  
    static get subcontractorDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subContractorId');

    }

    static get workorderDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workOrderId');

    }

    static get worknameDropdown() {
        return this.forms.usage
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workOrderId');

    }

    static get billnoDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'billNumber');
      } 

      static get otherChargeAmtInputBox(): FormlyFieldConfig {
        return this.detailsFields
           
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'othercharge');
    }
    static get retensionInputBox(): FormlyFieldConfig {
        return this.detailsFields
           
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'amountRetensionPercent');
    }

    static get amountTdsAmountInputBox(): FormlyFieldConfig {
        return this.detailsFields
           
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'amountTdsPercent');
    }
}