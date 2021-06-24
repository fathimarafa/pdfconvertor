export interface MaterialPurchaseReturn {
    id: number;
    debitNoteNo: string;
    returnDate: Date;
    supplierId: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedDate: Date;
    approvedBy: number;
    taxarea: string;
    purchaseReturnTypeId: number;
    transportationCharge: number;
    transportationPer: number;
    loadingUnloadingCharge: number;
    loadingUnloadingPer: number;
    otherCharges: number;
    otherChargesPer: number;
    voucherTypeId: number;
    voucherNumber: number;
    isDeleted: number;
    approvalRemarks: string;
    purchaseReturnDetail: PurchaseReturnDetail[]
}

export interface PurchaseReturnDetail {
    purchaseReturnDetailId: number;
    purchaseReturnId: number;
    materialId: number;
    quantity: number;
    rate: number;
    disount: number;
    tax: number;
}