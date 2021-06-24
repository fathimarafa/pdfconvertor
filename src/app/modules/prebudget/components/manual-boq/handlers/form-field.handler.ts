import { FormlyFieldConfig } from '@ngx-formly/core';
import { ILoggedInUser } from 'src/app/services/auth-service/iauthentication.service';
import { MaterialRegistrationMetadata } from '../../../../material/components/material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../../../material/components/material-registration/definitions/material-registration.definition';
import { LabourWorkRateSettingMetadata } from '../../../../hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../../../hr/components/labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { PrebudgetWorkTypeMetadata } from '../../work-type/work-type.configuration';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';

export class FormfieldHandler {

    private static stepperFields;
    private static dataproviderService: any;
    private static user: any;
    private static serviceRepo: any;

    static initialize(stepperFields, dataproviderService, user: ILoggedInUser, serviceRepo) {
        this.stepperFields = stepperFields;
        this.dataproviderService = dataproviderService;
        this.user = user;
        this.serviceRepo = serviceRepo;
        this.loadDropdowns();
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get categoryDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'categoryId');
    }

    static get workTypeDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workNameId');
    }

    static get insertFromTemplateCheckbox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3')
    }

    private static get materialDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'material').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'itemId');
    }

    private static get labourDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'labour').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'itemId');
    }

    private static get subContractorDropdown(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'subcontr').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'itemId');
    }

    private static loadMaterial() {
        this.dataproviderService.get(this.materialServiceUrl)
            .subscribe((res: MaterialRegistration[]) => {
                if (res) {
                    this.serviceRepo['material'] = res;
                    FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
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

    private static loadLabourWorkRate() {
        this.dataproviderService.get(this.labourWorkRateServiceUrl)
            .subscribe((res: LabourWorkRate[]) => {
                if (res) {
                    this.serviceRepo['labour'] = res.filter(e => e.specItemTypeId === 1);
                    this.serviceRepo['subcontr'] = res.filter(e => e.specItemTypeId === 2);
                    FormfieldHandler.labourDropdown.templateOptions.options = this.serviceRepo['labour'].map((e: LabourWorkRate) => (
                        {
                            label: e.labourWorkName,
                            value: e.id
                        }
                    ));
                    FormfieldHandler.subContractorDropdown.templateOptions.options = this.serviceRepo['subcontr'].map((e: LabourWorkRate) => (
                        {
                            label: e.labourWorkName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get labourWorkRateServiceUrl() {
        return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadWorkCategory() {
        this.dataproviderService.get(this.workCategoryServiceEndpoint)
            .subscribe((res: BasicWorkCategory[]) => {
                if (res) {
                    FormfieldHandler.categoryDropdown.templateOptions.options = res.map((e: BasicWorkCategory) => (
                        {
                            label: e.workCategoryName,
                            value: e.id
                        }
                    ));
                }
            });
    }

    private static get workCategoryServiceEndpoint() {
        return `${BasicWorkCategoryMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
    }

    private static loadWorkType() {
        this.dataproviderService.get(this.worktypeServiceUrl)
            .subscribe((res: PrebudgetWorkType[]) => {
                if (res) {
                    FormfieldHandler.workTypeDropdown.templateOptions.options = res.map((e: PrebudgetWorkType) => (
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

    private static loadDropdowns() {
        this.loadMaterial();
        this.loadLabourWorkRate();
        this.loadWorkCategory();
        this.loadWorkType();
    }

    static get waterElectricityChargePerInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'waterElectricityChargePer');
    }

    static get waterElectricityChargeAmtInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'waterElectricityCharge');
    }

    static get labourAdditionalChargePerInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalChargeper');
    }

    static get labourAdditionalChargeAmtInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalCharge');
    }

    static get subcontractAdditionalChargePerInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalChargePer');
    }

    static get subcontractAdditionalChargeAmtInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalCharge');
    }

    static get otherExpenseAmtInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'other_expense');
    }

    static get contractorProfitPerInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'contractorProfitPer');
    }

    static get contractorProfitAmtInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'contractorProfitAmt');
    }

    static get taxPerInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'taxPer');
    }

    static get taxAmountInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'taxAmount');
    }

    static get netAmountInputBox(): FormlyFieldConfig {
        return this.stepperFields.find(x => x.id === 'other').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'netAmount');
    }

}