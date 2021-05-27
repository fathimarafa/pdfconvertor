export interface QuotationBaseRateFeeding {
    id?: number;
    quotationId?: number;
    supplierId?: number;
    baseRate?: number;
    preference?: number;
    remarks?: string;
    minimumOrderQuantity?: number;
    indentId?: number;
    purchaseOrderId?: number;
    approvalStatus?: number;
    approvalLevel?: number;
    approvedDate?: Date;
    approvedBy?: number;
}