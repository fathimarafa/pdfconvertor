import { FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialRegistrationMetadata } from '../../../../../modules/material/components/material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../../../../modules/material/components/material-registration/definitions/material-registration.definition';
import { LabourWorkRateSettingMetadata } from '../../../../../modules/hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../../../../modules/hr/components/labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { BasicWorkCategory } from '../../../../../modules/basic/components/work-category/definitions/basic-work-category.definition';
import { BasicWorkCategoryMetadata } from '../../../../../modules/basic/components/work-category/basic-work-category.configuration';
import { PrebudgetWorkTypeMetadata } from '../../work-type/work-type.configuration';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { TemplateDetailsId } from '../definitions/template-registration.definition';
import { ILoggedInUser } from 'src/app/services/auth-service/iauthentication.service';

export class FormfieldHandler {

    private static dataHandler;
    private static formField;
    private static templateDetailsFormField;
    private static user: ILoggedInUser;

    static loadDropdown(dataProviderService, parentForm, childForm, user: ILoggedInUser) {
        this.user = user;
        this.dataHandler = dataProviderService;
        this.formField = parentForm;
        this.templateDetailsFormField = childForm;
        this.loadMaterial();
        this.loadLabour();
        this.loadWorkType();
        this.loadWorkCategory();
    }


    private static get workTypeDropdown(): FormlyFieldConfig {
        return this.formField[0].fieldGroup.find(e => e.key === 'workTypeId');
    }

    private static get workCategoryDropdown(): FormlyFieldConfig {
        return this.formField[0].fieldGroup.find(e => e.key === 'categoryId');
    }

    private static get materialDropdown(): FormlyFieldConfig {
        return this.templateDetailsFormField[TemplateDetailsId.material].fields[0].fieldGroup.find(e => e.key === 'itemId');
    }

    private static get labourDropdown(): FormlyFieldConfig {
        return this.templateDetailsFormField[TemplateDetailsId.labour].fields[0].fieldGroup.find(e => e.key === 'itemId');
    }

    private static get subContractorDropdown(): FormlyFieldConfig {
        return this.templateDetailsFormField[TemplateDetailsId.subcontr].fields[0].fieldGroup.find(e => e.key === 'itemId');
    }

    private static loadMaterial() {
        this.dataHandler.get(this.materialServiceUrl)
            .subscribe((res: MaterialRegistration[]) => {
                if (res) {
                    this.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
                        {
                            label: e.materialName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get materialServiceUrl() {
        return `${MaterialRegistrationMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadLabour() {
        this.dataHandler.get(this.labourServiceUrl)
            .subscribe((res: LabourWorkRate[]) => {
                if (res) {
                    this.labourDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
                        {
                            label: e.labourWorkName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get labourServiceUrl() {
        return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadWorkCategory() {
        this.dataHandler.get(this.workcategoryServiceUrl)
            .subscribe((res: BasicWorkCategory[]) => {
                if (res) {
                    this.workCategoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
                        {
                            label: e.workCategoryName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get workcategoryServiceUrl() {
        return `${BasicWorkCategoryMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadWorkType() {
        this.dataHandler.get(this.worktypeServiceUrl)
            .subscribe((res: PrebudgetWorkType[]) => {
                if (res) {
                    this.workTypeDropdown.templateOptions.options = res.map((e: PrebudgetWorkType) => (
                        {
                            label: e.workTypeName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get worktypeServiceUrl() {
        return `${PrebudgetWorkTypeMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadSubcontractor() {
        //todo
    }


}