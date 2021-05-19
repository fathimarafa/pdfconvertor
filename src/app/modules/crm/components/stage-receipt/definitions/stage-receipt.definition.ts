export interface StageReceipt {
    id?: number;
    recieptDate?: Date;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    voucherNumber?: number;
    voucherTypeId?: number;
    finantialYearId?: number;
    companyId?: number;
    branchId?: number;
    paymentMode?: string;
    paymentModeId?: number;
    paymentNo?: number;
    withClear?: number;
    remarks?: string;
    chequeClearenceID?: number;
    approvalStatus?: number;
    approvalLevel?: number;
    approvedBy?: number;
    isDeleted?: number;
    recieptDetail?: RecieptDetail[]
}

export interface RecieptDetail {
    recieptDetailId?: 1,
    recieptId?: 1,
    type?: 1,
    billId?: 1,
    amount?: 100,
    discount?: 50,
    advance?: 50
}