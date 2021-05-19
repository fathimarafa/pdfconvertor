import { FormlyFieldConfig } from '@ngx-formly/core';
import { NormalProjectMetadata } from '../normal-project.configuration';

export class FormfieldHandler {

    private static formFields: FormlyFieldConfig[];
    private static dataproviderService;

    static loadDropdowns(fields: FormlyFieldConfig[], httpservice) {
        this.formFields = fields;
        this.dataproviderService = httpservice;
        this.loadPaymentDropdown();
        this.loadConsultancyWorkDropdown();
    }

    static get paymentDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get consultancyWorkDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectCategoryId');
    }

    private static loadPaymentDropdown() {
        this.dataproviderService.get(`${NormalProjectMetadata.serviceEndPoint}PaymentMode`).subscribe((res) => {
            if (res) {
                this.paymentDropdown.templateOptions.options = res.map((e) => (
                    {
                        label: e.paymentMode,
                        value: e.id
                    }
                ))
            }
        });
    }

    private static loadConsultancyWorkDropdown() {
        let endpoint = NormalProjectMetadata.serviceEndPoint;
        endpoint = endpoint.replace('Project', 'ConsultancyWork')
        this.dataproviderService.get(endpoint).subscribe((res) => {
            if (res) {
                this.consultancyWorkDropdown.templateOptions.options = res.map((e) => (
                    {
                        label: e.workName,
                        value: e.id
                    }
                )
                )
            }
        });
    }


}