import { FormlyFieldConfig } from '@ngx-formly/core';
import { IndentForm } from '../definition/subcontractor-indent.definition';


export class FormfieldHandler {

    private static forms: IndentForm;

    static initialize(form: IndentForm) {
        this.forms = form;
    }

  
    static get projectDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }


    static get blockDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get categoryDropdown(){
      return this.forms.indent.fields
          .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
          .find((x: FormlyFieldConfig) => x.key === 'indentCategoryId');
      }

    static get worknameDropdown() {
        return this.forms.itemDetails.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
             .find((x: FormlyFieldConfig) => x.key === 'workId');
     }
  
   
    static get subcontractorDropdown() {
        return this.forms.indent.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subContractorId');

    }
  

}
