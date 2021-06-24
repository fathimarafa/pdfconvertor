export interface RateEvaluation {
    id: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    subTotal: number;
    waterElectricityCharge: number;
    labourAdditionalCharge: number;
    subcontractAdditionalCharge: number;
    contractorProfit: number;
    contractorProfitAmt: number;
    other_expense: number;
    tax: number;
    taxAmount: number;
    companyId: number;
    branchId: number;
    rateEvaluationDetails: RateEvaluationDetails[]
}

export interface RateEvaluationDetails {
    rateEvaluationDetailsId: number;
    rateEvaluationId: number;
    specItemTypeId: number;
    specItemId: number;
    specItemName: string;
    qtyRequired: number;
    rateOfItem: number;
    marketRate: number;
    rateOfConveyance: number;
}