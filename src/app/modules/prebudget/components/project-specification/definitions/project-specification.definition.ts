export interface ProjectSpecification {
    id: number;
    specId: number;
    projectId: number;
    category: number;
    quantityRequired: number;
    companyId: number;
    branchId: number;
    specUnit: number;
    ratePerUnit: number;
    deptRatePerUnit: number;
    marktRatePerUnit: number;
    negotiatedRatePerUnit: number;
    waterElectricityCharge: number;
    labourAdditionalCharge: number;
    subcontractAdditionalCharge: number;
    contractorProfit: number;
    contractorProfitAmt: number;
    other_expense: number;
    tax: number;
    taxAmount: number;
    taxArea: string;
    taxType: string;
    userId: number;
    projectSpecificationDetails: ProjectSpecificationDetails[]
}

export interface ProjectSpecificationDetails {
    projectSpecificationDetailsId: number;
    projectSpecificationMasterId: number;
    specItemTypeId: number;
    specItemId: number;
    qtyRequired: number;
    rateOfItem: number;
    marketRate: number;
    rateOfConveyance: number;
}