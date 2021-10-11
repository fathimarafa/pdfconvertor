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
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get unitFieldRow(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-1')
    }

    static get blockFloorRow(): FormlyFieldConfig {
        return this.forms.issued
            .find((x: FormlyFieldConfig) => x.id === 'row-2')
    }

    static get categoryDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'category');
      }
      static get foremanDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'foremanId');
      }
    
   
    static get ordernoDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'workOrderMasterId');
      } 

      static get billnoDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'billNumber');
      } 
      static get worktypeDropdown(){
        return this.forms.issued
          .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'voucherTypeId');
      } 

}