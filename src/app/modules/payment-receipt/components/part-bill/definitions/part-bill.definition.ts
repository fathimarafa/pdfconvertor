export interface PartBill {
    id?:number;
    billDate?: Date;
    fromDate?: Date;
    toDate?: Date;
    dueDate?: Date;
    billType?: number;
    taxTypeId?: number;
    billNo?: string;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    companyId?: number;
    branchId?: number;
    amount?: number;
    advanceAmount?: number;
    balanceAmount?: number;
    financialYearId?: number;
    voucherTypeId?: number;
    voucherNumber?: number;
    approvalStatus?: number;
    approvedDate?: Date;
    approvedBy?: number;
    approvalLevel?: number;
    finalBill?: number;
    taxarea?: string;
    taxType?: string;
    labourWelfarePercent?: number;
    labourWelfareAmount?: number;
    retentionPercent?: number;
    retentionAmount?: number;
    ldPercent?: number;
    ldAmount?: number;
    tdsPercent?: number;
    tdsAmount?: number;
    igstPercent?: number;
    igstAmount?: number;
    sgstPer?: number;
    sgstAmount?: number;
    cgstPer?: number;
    cgstAmount?: number;
    kfcPercent?: number;
    kfcAmount?: number;
    shippingDetails?: string;
    remarks?: string;
    roundOff?: number;
    isDeleted?: number;
    approvalRemarks?: string;
    isReject?: number;
    partBillDetails?: PartBillDetails[]
}


export interface PartBillDetails {
    partBillDetailsId?:number;
    partBillMasterId?:number;
    scheduleNo?:number;
    specId?: number;
    partRatePerUnit?: number;
    scheduledQty?:number;
    previousQty?:number;
    currentQty?:number;
    tax?: number;
    taxAmount?: number;
    currentAmount?: number;
    description?: string;
}