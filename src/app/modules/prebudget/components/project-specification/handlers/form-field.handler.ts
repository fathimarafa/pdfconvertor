import { FormlyFieldConfig } from '@ngx-formly/core';
import { BasicWorkCategoryMetadata } from 'src/app/modules/basic/components/work-category/basic-work-category.configuration';
import { BasicWorkCategory } from 'src/app/modules/basic/components/work-category/definitions/basic-work-category.definition';
import { Department } from 'src/app/modules/hr/components/department/definitions/department.definition';
import { DepartmentMetadata } from 'src/app/modules/hr/components/department/department.configuration';
import { LabourWorkRateSettingMetadata } from 'src/app/modules/hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { ILoggedInUser } from 'src/app/services/auth-service/iauthentication.service';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { PrebudgetWorkTypeMetadata } from '../../work-type/work-type.configuration';

interface StepperFields {
    id: string;
    label: string;
    hasTable: boolean;
    fields: FormlyFieldConfig[]
}

export class FormfieldHandler {

    private static fields: StepperFields[];
    private static dataproviderService: any;
    private static user: any;

    static initialize(fields: StepperFields[], dataproviderService, user: ILoggedInUser) {
        this.fields = fields;
        this.dataproviderService = dataproviderService;
        this.user = user;
        this.loadDropdowns();
    }

    static get departmentDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'departmentId');
    }

    static get projectDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'projectId');
    }

    static get blockDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'blockId');
    }

    static get floorDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'floorId');
    }

    static get unitDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'project-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'unitId');
    }

    static get specnamenumberInputbox(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'specification-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'specNameOrNumber');
    }

    static get categoryDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'specification-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'categoryId');
    }

    static get workTypeDropdown(): FormlyFieldConfig {
        return this.fields.find((x: any) => x.id === 'specification-details').fields
            .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
            .find((x: FormlyFieldConfig) => x.key === 'workTypeId');
    }

    // static get waterElectricityChargePerInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'waterElectricityCharge');
    // }

    // static get waterElectricityChargeAmtInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'waterElectricityChargeAmt');
    // }

    // static get labourAdditionalChargePerInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalCharge');
    // }

    // static get labourAdditionalChargeAmtInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'labourAdditionalChargeAmt');
    // }

    // static get subcontractAdditionalChargePerInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalCharge');
    // }

    // static get subcontractAdditionalChargeAmtInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'subcontractAdditionalChargeAmt');
    // }

    // static get otherExpenseAmtInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-3').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'other_expense');
    // }

    // static get contractorProfitPerInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'contractorProfit');
    // }

    // static get contractorProfitAmtInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'contractorProfitAmt');
    // }

    // static get taxPerInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'tax');
    // }

    // static get taxAmountInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-5').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'taxAmount');
    // }

    // static get netAmountInputBox(): FormlyFieldConfig {
    //     return this.evaluationFields
    //         .find((x: FormlyFieldConfig) => x.id === 'row-6').fieldGroup
    //         .find((x: FormlyFieldConfig) => x.key === 'netamount');
    // }

    private static loadDropdowns() {
        this.loadDepartment();
        this.loadWorkCategory();
        this.loadWorkType();
    }

    private static loadDepartment() {
        this.dataproviderService.get(DepartmentMetadata.serviceEndPoint)
            .subscribe((res: Department[]) => {
                if (res) {
                    this.departmentDropdown.templateOptions.options = res.map((e: Department) => (
                        {
                            label: e.departmentLongName,
                            value: e.departmentId
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

}