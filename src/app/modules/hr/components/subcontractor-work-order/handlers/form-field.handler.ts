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
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }


    static get workcategoryDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'category');
            
    }
    static get subcontractorDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subContractorId');

    }

    static get workorderDropdown() {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workOrderNo');

    }
    
    static get worknameDropdown() {
        return this.forms.usage
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workId');

    }
    

}


// import { FormlyFieldConfig } from '@ngx-formly/core';


// export class FormfieldHandler {

//     private static forms: FormlyFieldConfig[];

//     static initialize(form: FormlyFieldConfig[]) {
//         this.forms = form;
//     }

//     static get projectDropdown(): FormlyFieldConfig {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'projectId');
//     }

//     static get blockDropdown(): FormlyFieldConfig {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'blockId');
//     }

//     static get floorDropdown(): FormlyFieldConfig {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'floorId');
//     }

//     static get unitDropdown(): FormlyFieldConfig {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'unitId');
//     }

//     static get materialDropdown() {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'itemId');
//     }

//     static get supplierDropdown(): FormlyFieldConfig {
//         return this.forms
//             .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
//             .find((x: FormlyFieldConfig) => x.key === 'supplierPreffered');
//     }


// }