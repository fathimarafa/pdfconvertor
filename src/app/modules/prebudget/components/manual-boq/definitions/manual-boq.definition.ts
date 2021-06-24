export interface ManualBOQ {
    id?: number;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    categoryId?: number;
    workNameId?: number;
    companyId?: number;
    branchId?: number;
    qty?: number;
    waterElectricityChargePer?: number;
    waterElectricityCharge?: number;
    labourAdditionalChargeper?: number;
    labourAdditionalCharge?: number;
    subcontractAdditionalChargePer?: number;
    subcontractAdditionalCharge?: number;
    contractorProfitPer?: number;
    contractorProfitAmt?: number;
    other_expense?: number;
    taxPer?: number;
    taxAmount?: number;
    netAmount?: number;
    approvedBy?: number;
    approvalStatus?: number;
    approvalLevel?: number;
    approvalRemarks?: string;
    isReject?: number;
    boqDetails?: BOQDetails[]
}

export interface BOQDetails {
    itemTypeId?: number;
    itemId?: number;
    qtyRequired?: number;
    rateOfItem?: number;
    masApproval?: number;
}