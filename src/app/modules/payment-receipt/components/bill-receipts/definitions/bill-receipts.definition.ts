export interface BillReceipt {
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
    recieptDetail?: BillRecieptDetail[]
}

export interface BillRecieptDetail {
    recieptDetailId?: number;
    recieptId?: number;
    type?: number;
    billId?: number;
    amount?: number;
    discount?: number;
    advance?: number;
}