export interface ForemanWorkBill{
    id: number;
    workOrderMasterId: number;
    billDate: Date;
    billNumber: string;
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
    export interface workno {
        id: number;
        workName: String;
        dateOrdered: Date;
        foremanId: number;
        workTypeId: number;
        projectId: number;
        unitId: number;
        blockId: number;
        floorId: number;
        description: String;
        companyId: number;
        branchId: number;
        workStatus: number;
        userId: number;
    }
    export interface ForemanWorkOrderList{
        id: number;
        workName: string;
        dateOrdered: Date;
        foremanId: number;
        fullName: string;
        workTypeId: number;
        workTypeName: string;
        projectName: string;
        // projectId":1010,"blockId":0,"blockName":" ","floorId":0,"floorName":" ","unitId":0,"unitName":" ","description":"Description","companyId":1,"branchId":2,"workStatus":1},
    }