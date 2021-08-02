import { FormlyFieldConfig } from '@ngx-formly/core';

export interface ModalFormFields {
    issued: FormlyFieldConfig[];
    usage: FormlyFieldConfig[];
}

export class FormfieldHandler {

    private static forms: ModalFormFields;

    static initialize(modalForm: ModalFormFields) {
        this.forms = modalForm;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get unitFieldRow(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-3')
    }

    static get blockFloorRow(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2')
    }

  
    static get subcontractorDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subContractorId');

    }

    static get workorderDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workOrderId');

    }

    static get worknameDropdown() {
        return this.forms.usage
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workOrderId');

    }
    
}