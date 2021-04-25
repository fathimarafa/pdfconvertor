import { CrmWorkTypeMetadata } from '../../work-type/work-type.configuration';
import { PrebudgetWorkType } from '../../work-type/definitions/work-type.definition';
import { DepartmentMetadata } from '../../../../hr/components/department/department.configuration';
import { Department } from '../../../../hr/components/department/definitions/department.definition';
import { UnitRegistrationMetadata } from '../../../../material/components/unit-registration/unit-registration.configuration';
import { UnitRegistration } from '../../../../material/components/unit-registration/definitions/unit-registration.definition';
import { MaterialRegistrationMetadata } from '../../../../material/components/material-registration/material-registration.configuration';
import { MaterialRegistration } from '../../../../material/components/material-registration/definitions/material-registration.definition';
import { LabourWorkRateSettingMetadata } from '../../../../hr/components/labour-workrate-setting/labour-workrate-setting.configuration';
import { LabourWorkRate } from '../../../../hr/components/labour-workrate-setting/definitions/labour-workrate-setting.definition';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { StepType } from '../definitions/specification-registration.definition';

export class FormfieldHandler {

  private static steps: StepType[];
  private static dataproviderService: any;

  private static initialize(steps: StepType[], dataproviderService) {
    this.steps = steps;
    this.dataproviderService = dataproviderService;
  }

  private static get departmentDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'spec').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'departmentId');
  }

  private static get workTypeDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'spec').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'workTypeId');
  }

  private static get unitDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'spec').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-2').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'unitId');
  }

  private static get materialDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'material').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'specItemId');
  }

  private static get labourDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'labour').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'specItemId');
  }

  private static get subContractorDropdown(): FormlyFieldConfig {
    return this.steps.find(x => x.id === 'subcontr').fields
      .find((x: FormlyFieldConfig) => x.id === 'row-1').fieldGroup
      .find((x: FormlyFieldConfig) => x.key === 'specItemId');
  }

  static loadDropdowns(steps: StepType[], dataproviderService) {
    this.initialize(steps, dataproviderService);
    this.loadDepartment();
    this.loadWorkType();
    this.loadUnt();
    this.loadMaterial();
    this.loadLabour();
  }

  private static loadDepartment() {
    this.dataproviderService.get(DepartmentMetadata.serviceEndPoint)
      .subscribe((res: Department[]) => {
        if (res) {
          FormfieldHandler.departmentDropdown.templateOptions.options = res.map((e: Department) => (
            {
              label: e.departmentLongName,
              value: e.departmentId
            }
          ));
        }
      });
  }

  private static loadWorkType() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataproviderService.get(`${CrmWorkTypeMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
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

  private static loadUnt() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    const endPoint = `${UnitRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`;
    this.dataproviderService.get(endPoint)
      .subscribe((res: UnitRegistration[]) => {
        if (res) {
          FormfieldHandler.unitDropdown.templateOptions.options = res.map((e: UnitRegistration) => (
            {
              label: e.unitLongName,
              value: e.unitId
            }
          ));
        }
      });
  }

  private static loadMaterial() {
    const dummyCompanyId = 1; const dummyBranchId = 0;
    this.dataproviderService.get(`${MaterialRegistrationMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: MaterialRegistration[]) => {
        if (res) {
          FormfieldHandler.materialDropdown.templateOptions.options = res.map((e: MaterialRegistration) => (
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
    this.dataproviderService.get(`${LabourWorkRateSettingMetadata.serviceEndPoint}/${dummyCompanyId}/${dummyBranchId}`)
      .subscribe((res: LabourWorkRate[]) => {
        if (res) {
          FormfieldHandler.labourDropdown.templateOptions.options = res.map((e: LabourWorkRate) => (
            {
              label: e.labourWorkName,
              value: e.id
            }
          ));
        }
      });
  }

  loadSubContractor() {
    //todo
  }

}