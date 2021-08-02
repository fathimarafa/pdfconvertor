export interface ContractorPayment {
    projectId: number;
    id: number;
    employeeId: number;
    paymentDate: Date;
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
    contractorPaymentDetails: ContractorPaymentDetails[]
    contractorForPayment: ContractorForPayment[]
}
export interface  ContractorPaymentDetails{
                
                    contractorPaymentDetailsId: number;
                    contractorPaymentId: number;
                    billId: number;
                    projectId: number;
                    unitId: number;
                    blockId: number;
                    floorId: number;
                    paymentAmount: number;
                    discountAmount: number;
                    advanceAmount: number;
                    
             
       
}
export interface ContractorForPayment{
    // financialYearId: number;
    // siteManagerId: number;
    // employeeId: number;
    id: number;
    workOrderNo: number;
    dateOrdered: Date;
    projectId: number;
    projectName: String;
    unitId: number;
    unitName: String;
    blockId: number;
    blockName: String;
    floorId: number;
    floorName: String;
    billAmount: number;
    payment: number;
    billAmountBalance: number;
    }
