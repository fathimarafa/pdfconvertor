import { FormlyFieldConfig } from "@ngx-formly/core";

export interface Specification {
    id: number;
    specNumber: number;
    specName: string;
    sacCode: string;
    specDescription: string;
    departmentId: number;
    workTypeId: number;
    unitId: number;
    companyId: number;
    branchId: number;
    specUnit: number;
    ratePerUnit: number;
    deptRatePerUnit: number;
    waterElectricityCharge: number;
    labourAdditionalCharge: number;
    subcontractAdditionalCharge: number;
    contractorProfit: number;
    contractorProfitAmt: number;
    other_expense: number;
    tax: number;
    taxAmount: number;
    userId: number;
    specificationDetails: SpecificationDetail[]
}

export interface SpecificationDetail {
    specificationDetailsId: number;
    specificationMasterId: number;
    specItemTypeId: number;
    specItemId: number;
    qtyRequired: number;
    rateOfItem: number;
    rateOfConveyance: number;
}

export enum SpecificationDetailsTabId {
    material = 'material',
    labour = 'labour',
    subcontr = 'subcontr',
}

export interface StepType {
    id: string;
    label: string;
    fields: FormlyFieldConfig[];
  }