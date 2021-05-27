import { FormlyFieldConfig } from '@ngx-formly/core';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { MaterialQuotationMetadata } from '../../material-quotation/material-quotation.configuration';
import { MaterialQuotation } from '../../material-quotation/definitions/material-quotation.definition';

export class FormfieldHandler {

    private static formFields: FormlyFieldConfig[];
    private static httpService;
    private static user;

    static loadDropdowns(formFields: FormlyFieldConfig[], httpService, user) {
        this.formFields = formFields;
        this.httpService = httpService;
        this.user = user;
        this.fetchSuppliers();
    }

    static get quotationDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'quotationId');
    }

    private static get supplierDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'supplierId');
    }

    private static fetchSuppliers() {
        this.httpService.get(this.supplierServiceUrl)
            .subscribe((res: SupplierRegistration[]) => {
                if (res) {
                    this.supplierDropdown.templateOptions.options = res.map((e: SupplierRegistration) => (
                        {
                            label: e.supplierName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get supplierServiceUrl() {
        return `${SupplierRegistrationMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`
    }


}