import { PrebudgetWorkTypeMetadata } from '../../work-type/work-type.configuration';
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
import { ILoggedInUser } from 'src/app/services/auth-service/iauthentication.service';

export class FormfieldHandler {

  private static steps: StepType[];
  private static dataproviderService: any;
  private static user: any;

  private static initialize(steps: StepType[], dataproviderService, user: ILoggedInUser) {
    this.steps = steps;
    this.dataproviderService = dataproviderService;
    this.user = user;
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

  static loadDropdowns(steps: StepType[], dataproviderService, user: ILoggedInUser) {
    this.initialize(steps, dataproviderService, user);
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


  private static loadUnt() {
    this.dataproviderService.get(this.unitServiceUrl)
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

  private static get unitServiceUrl() {
    return `${UnitRegistrationMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
  }


  private static loadMaterial() {
    this.dataproviderService.get(this.materialServiceUrl)
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

  private static get materialServiceUrl() {
    return `${MaterialRegistrationMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
  }

  private static loadLabour() {
    this.dataproviderService.get(this.labourServiceUrl)
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

  private static get labourServiceUrl() {
    return `${LabourWorkRateSettingMetadata.serviceEndPoint}/${this.user.companyId}/${this.user.branchId}`;
  }

  loadSubContractor() {
    //todo
  }

}