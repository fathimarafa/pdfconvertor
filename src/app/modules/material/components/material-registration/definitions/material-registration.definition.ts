export interface MaterialRegistration {
    id: string;
    materialId: number;
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
    kfcPer: number;
    landingCost: number;
    hsnCode: string;
    remarks: string;
    userId: number;
    openingStock?: OpeningStock[]
}

export interface OpeningStock {
    openingStockId: number;
    materialId: number;
    projectId: number;
    stock: number;
    unit_Id: number;
    blockId: number;
    floorId: number;
    rate: number;
    financialYearId: number;
}