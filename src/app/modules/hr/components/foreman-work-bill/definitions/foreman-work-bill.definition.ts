export interface ForemanWorkBill{
    id: number;
    workOrderMasterId: number;
    billDate: Date;
    billNumber: number;
    foremanId: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    amount: number;
    amountPaidAdvance: number;
    balanceAmount: number;
    financialYearId: number;
    category: number;
    voucherTypeId: number;
    voucherNumber: number;
    approvalStatus: number;
    approvedDate: Date;
    approvedBy: number;
    approvalLevel: number;
    isDeleted: number;
    foremanWorkBillDetails: ForemanWorkBillDetails[]
    
}
export interface ForemanWorkBillDetails{
               
        foremanWorkBillDetailsId: number;
        foremanWorkBillId: number;
        labourWorkId: number;
        noOfLabours: number;
        wage: number;
        otRate: number;
        otHours: number;
                
    }
      