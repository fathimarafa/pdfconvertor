export interface AdditionBillGeneration {
    id: number;
    billDate: Date;
    dueDate: Date;
    billNumber: string;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    amount: number;
    balanceAmount: number;
    financialYearId: number;
    voucherTypeId: number;
    voucherNumber: number;
    approvalStatus: number;
    approvedDate: Date;
    approvedBy: number;
    approvalLevel: number;
    workDescription: string;
    taxarea: string;
    taxType: string;
    labourWelfarePercent: number;
    labourWelfareAmount: number;
    tdsPercent: number;
    tdsAmount: number;
    sgstAmount: number;
    igstAmount: number;
    cgstAmount: number;
    kfcPer: number;
    kfcAmount: number;
    isDeleted: number;
    additionalBillDetails: AdditonalBillDetails[]
}

export interface AdditonalBillDetails {
    additionalBillDetailsId: number;
    additionalBillId: number;
    itemDescription: string;
    quantity: number;
    rate: number;
    taxPer: number;
    saccode: string;
}