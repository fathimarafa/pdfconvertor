export interface Refund {
    id?: number;
    projectId?: number;
    refundType?: number;
    refunddate?: Date;
    refundAmount?: number;
    performanceguarantee?: number;
    paymentMode?: string;
    paymentModeId?: number;
    paymentNo?: string;
    masterId?: number;
    voucherNumber?: number;
    voucherTypeId?: number;
    financialYearId?: number;
    companyId?: number;
    branchId?: number;
    userId?: number;
    isDeleted?: number;
    narration?: string;
}