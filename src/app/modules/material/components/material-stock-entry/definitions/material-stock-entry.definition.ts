export interface MaterialStockEntry {
    id?: number;
    purchaseInvoiceNo?: string;
    purchaseOrderNo?: number;
    purchaseDate?: Date;
    supplierId?: number;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    remark?: string;
    taxarea?: string;
    category?: number;
    approvalStatus?: number;
    approvalLevel?: number;
    approvedDate?: Date;
    approvedBy?: number;
    companyId?: number;
    branchId?: number;
    finantialYearId?: number;
    voucherTypeId?: number;
    voucherNumber?: number;
    isDeleted?: number;
    billAmount?: number;
    billAmountBalance?: number;
    amountPaidAdvance?: number;
    billdiscount?: number;
    roundoff?: number;
    transportationCharge?: number;
    transportationPer?: number;
    loadingUnloadingCharge?: number;
    loadingUnloadingPer?: number;
    otherCharges?: number;
    otherChargesPer?: number;
    reqLoadingTax?: string;
    reqTransportTax?: string;
    reqOtherCharesTax?: string;
    kfcPer?: number;
    gstPer?: number;
    gstAmount?: number;
    kfcAmount?: number;
    materialTypeId?: number;
    purchaseDetail?: MaterialStockPurchaseDetail[]
}

export interface MaterialStockPurchaseDetail {
    purchaseDetailId?: number;
    purchaseId?: number;
    materialId?: number;
    quantity?: number;
    rate?: number;
    disount?: number;
    tax?: number;
    purchaseOrderDetailsId?: number;
    kfC_Per?: number;
}