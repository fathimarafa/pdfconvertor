import { FormlyFieldConfig } from '@ngx-formly/core';

export class FormfieldHandler {
  private static forms: FormlyFieldConfig[];

  static initialize(form: FormlyFieldConfig[]) {
    this.forms = form;
  }

  static get designationDropdown(): FormlyFieldConfig {
    return this.forms.find((x: FormlyFieldConfig) => x.id === 'designationId');
    // .fieldGroup.find((x: FormlyFieldConfig) => x.key === 'designationId');
  }

  static get employeeDropdown(): FormlyFieldConfig {
    return this.forms.find((x: FormlyFieldConfig) => x.id === 'employeeId');
    // .fieldGroup.find((x: FormlyFieldConfig) => x.key === 'employeeId');
  }

  static get bankDropdown(): FormlyFieldConfig {
    return this.forms.find((x: FormlyFieldConfig) => x.id === 'paymentModeId');
    // .fieldGroup.find((x: FormlyFieldConfig) => x.key === 'bankId');
  }
}
