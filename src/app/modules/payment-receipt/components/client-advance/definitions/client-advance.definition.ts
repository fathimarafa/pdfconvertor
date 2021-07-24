export interface ClientAdvance {
    id: number;
    date: Date;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    advanceAmount: number;
    tdsAmount: number;
    remarks: string;
    paymentMode: string;
    paymentModeId: number;
    paymentModeNo: string;
    withclear: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedBy: number;
    approvedDate: Date;
    voucherTypeId: number;
    voucherNumber: number;
    isDeleted: number;
    approvalRemarks: string;
    isReject: number;
}