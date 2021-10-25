export interface ContractorWorkOrder{
  

    id: number;
    dateOrdered: Date;
    workOrderNo: String;
    contractorId: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    billAmount: number;
    billAmountBalance: number;
    negotiatedAmount: number;
    taxType: String;
    tax: number;
    taxAmount: number;
    remarks: String;
    category: number;
    voucherNumber: number;
    voucherTypeId: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedBy: number;
    isDeleted: number;
   
    contractorWorkOrderDetails: ContractorWorkOrderDetails[]
   
}
export interface ContractorWorkOrderDetails{
    
        contractorWorkOrderDetailsId: number;
        contractorWorkOrderId: number;
        hsnCode: String;
        workName: String;
        qty: number;
       rate: number;
       tax: number;
    }




