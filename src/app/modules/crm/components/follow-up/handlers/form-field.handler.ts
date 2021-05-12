import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from '../../user/definitions/user.definition';
import { UserMetadata } from '../../user/user.configuration';
import { EnquiryStatus } from '../../enquiry-status/definition/enquiry-status.definition';
import { EnquiryStatusMetadata } from '../../enquiry-status/enquiry-status.configuration';

export class FormfieldHandler {

    private static fields: FormlyFieldConfig[];
    private static dataproviderService;

    static loadDropdown(fieldConfig: FormlyFieldConfig[], dataprovider) {
        this.fields = fieldConfig;
        this.dataproviderService = dataprovider;
        this.loadUserDropdown();
        this.loadEnquiryStatusDropdown();
    }

    private static loadUserDropdown() {
        this.dataproviderService.get(UserMetadata.serviceEndPoint)
            .subscribe((res: User[]) => {
                if (res) {
                    this.userDropdown.templateOptions.options = res.map((e: User) => (
                        {
                            label: e.fullName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get userDropdown(): FormlyFieldConfig {
        return this.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'attendedstaff');
    }

    private static loadEnquiryStatusDropdown() {
        this.dataproviderService.get(EnquiryStatusMetadata.serviceEndPoint)
            .subscribe((res: EnquiryStatus[]) => {
                if (res) {
                    this.statusDropdown.templateOptions.options = res.map((e: EnquiryStatus) => (
                        {
                            label: e.status,
                            value: e.enquiryStatusId
                        }
                    ));
                }
            });
    }

    private static get statusDropdown(): FormlyFieldConfig {
        return this.fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'status');
    }


}