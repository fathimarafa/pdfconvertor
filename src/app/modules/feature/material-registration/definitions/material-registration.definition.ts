export interface MaterialRegistration {
    hsnCode: string;
    materialName: number;
    materialTypeId: number;
    materialBrandId: number;
    materialCategoryId: number;
    materialSize: number;
    unitId: number;
    materialUnitRate: number;
    companyId: number;
    branchId: number;
    openigStock: number;
    taxPer: number;
    landingCost: number;
    materialUID: string;
    financialYearId: number;
    stocks?: Stock[]
}

export interface Stock {
    projectId: number;
    stock: number;
    unitId: number;
    rate: number;
}