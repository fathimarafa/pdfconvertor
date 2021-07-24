import { FormlyFieldConfig } from '@ngx-formly/core';
import { SupplierRegistrationMetadata } from '../../supplier-registration/supplier-registration.configuration';
import { SupplierRegistration } from '../../supplier-registration/definitions/supplier-registration.definition';
import { BankAccount } from '../../../../basic/components/bank-account-registration/definitions/bank-account-registration.definition';
import { BankAccountRegistrtaionMetadata } from '../../../../basic/components/bank-account-registration/bank-account-registration.configuration';

export class FormfieldHandler {

    private static formFields: FormlyFieldConfig[];
    private static httpService;
    private static user;

    static loadDropdowns(formFields: FormlyFieldConfig[], httpService, user) {
        this.formFields = formFields;
        this.httpService = httpService;
        this.user = user;
        this.fetchSuppliers();
        this.fetchBank();
    }

    private static get supplierDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'supplierId');
    }

    private static get bankDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'paymentBy');
    }

    private static get sitemanagerDropdown(): FormlyFieldConfig {
        return this.formFields
            .find((x: FormlyFieldConfig) => x.id === 'row-4').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'sitemanagerId');
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

    private static fetchBank() {
        this.httpService.get(this.bankServiceUrl)
            .subscribe((res: BankAccount[]) => {
                if (res) {
                    this.bankDropdown.templateOptions.options = res.map((e: BankAccount) => (
                        {
                            label: e.bankName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get bankServiceUrl() {
        return `${BankAccountRegistrtaionMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`
    }


}