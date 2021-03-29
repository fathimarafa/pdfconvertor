export interface Journal {
    id?: number;
    journalDate?: Date;
    companyId?: number;
    branchId?: number;
    financialYearId?: number;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    debitHeadId?: number;
    creditHeadId?: number;
    amount?: number;
    voucherTypeId?: number;
    voucherNumber?: number;
    approvalStatus?: number;
    approvedBy?: number;
    approvalLevel?: number;
    description?: string;
}