import { FormlyFieldConfig } from '@ngx-formly/core';
import { MaterialRegistrationMetadata } from '../../../../../modules/material/components/material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../../../../modules/material/components/material-registration/definitions/material-registration.definition';
import { LabourWorkRateSettingMetadata } from '../../../../../modules/hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../../../../modules/hr/components/labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { BasicWorkCategory } from '../../../../../modules/basic/components/work-category/definitions/basic-work-category.definition';
import { BasicWorkCategoryMetadata } from '../../../../../modules/basic/components/work-category/basic-work-category.configuration';
import { CrmWorkTypeMetadata } from '../../work-type/work-type.configuration';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { TemplateDetailsId } from '../definitions/template-registration.definition';

export class FormfieldHandler {

    private static dataHandler;
    private static formField;
    private static templateDetailsFormField;

    static loadDropdown(dataProviderService, parentForm, childForm) {
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
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get(`${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

    private static loadLabour() {
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get(`${LabourWorkRateSettingMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

    private static loadWorkCategory() {
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get(`${BasicWorkCategoryMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

    private static loadWorkType() {
        const dummyCompanyId = 1; const dummyBranchId = 0;
        this.dataHandler.get(`${CrmWorkTypeMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

    private static loadSubcontractor() {
        //todo
    }


}