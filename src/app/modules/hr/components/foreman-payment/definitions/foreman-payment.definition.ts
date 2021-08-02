export interface ForemanPayment {
    id: number;
    employeeId: number;
    paymentDate: Date;
    dateFrom: Date;
    dateTo: Date;
    voucherNumber: number;
    voucherTypeId: number;
    finantialYearId: number;
    companyId: number;
    branchId: number;
    paymentMode: String;
    paymentModeId: number;
    paymentNo: number;
    withClear: number;
    remarks: String;
    chequeClearenceID: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedBy: number;
    isDeleted: number;
    foremanPaymentDetails: ForemanPaymentDetails[]
    //foremanForPayment: ForemanForPayment[]
}
export interface ForemanPaymentDetails{
        foremanPaymentDetailsId: number;
        foremanPaymentId: number;
        billId: number;
        projectId: number;
        unitId: number;
        blockId: number;
        floorId: number;
        paymentAmount: number;
        discountAmount: number;
        advanceAmount: number;
                 

}
export interface ForemanForPayment{
    id: number;
    billNumber: number;
    billDate: Date;
    projectId: number;
    projectName: String;
    unitId: number;
    unitName: String;
    blockId: number;
    blockName: String;
    floorId: number;
    floorName: String;
    totalWage: number;
    totOtAmount: number;
    advancePaid: number;
    billAmount: number;
    payment: number;
    billAmountBalance: number;
}