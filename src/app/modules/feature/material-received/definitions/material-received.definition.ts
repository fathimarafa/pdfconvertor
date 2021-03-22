export interface MaterialReceived {
    id: number;
    transferId: number;
    receiveDate: Date,
    projectIdTo: number;
    unitIdTo: number;
    blockIdTo: number;
    floorIdTo: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    approvalStatus: number;
    approvalLevel: number;
    receiveApprovedDate: Date,
    receiveApprovedBy: number;
    transportationCharge: number;
    transportationPer: number;
    loadingUnloadingCharge: number;
    loadingUnloadingPer: number;
    otherCharges: number;
    otherChargesPer: number;
    miscellaneousExpense: number;
    miscellaneousExpensePer: number;
    voucherTypeId: number;
    voucherNumber: number;
    isDeleted: number;
    recieptDetail: RecieptDetail[];
}

export interface RecieptDetail {
    recieptDetailId: number;
    materialRecieptId: number;
    materialId: number;
    quantity: number;
    rate: number;
    tax: number;
}

