import { FormlyFieldConfig } from '@ngx-formly/core';

export interface ModalFormFields {
    materialFields: FormlyFieldConfig[];
    stockFields: FormlyFieldConfig[];
}

export class FormfieldHandler {

    private static forms: ModalFormFields;

    static initialize(modalForm: ModalFormFields) {
        this.forms = modalForm;
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.forms.stockFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.forms.stockFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.forms.stockFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.forms.stockFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get materialCategoryDropdown() {
        return this.forms.materialFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'materialCategoryId');
    }

    static get materialUnitDropdown(): FormlyFieldConfig {
        return this.forms.materialFields
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get materialBrandDropdown() {
        return this.forms.materialFields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'materialBrandId');
    }

    static get openingStockDropdown() {
        return this.forms.materialFields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'openigStock');
    }

}