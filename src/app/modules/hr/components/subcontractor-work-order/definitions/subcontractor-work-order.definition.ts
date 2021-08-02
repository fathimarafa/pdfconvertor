export interface SubContractorWorkOrder {
    
    id: number;
    dateOrdered: Date;
    workOrderNo: String;
    subContractorId:number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    remarks: String;
    workOrderStatus : number;
    approvalStatus : number;
    approvalLevel: number;
    approvedBy: number;
    category: number;
    isDeleted: number;
    subContractorWorkOrderDetails: SubContractorWorkOrderDetails[]
    indentDetails:IndentDetails[]
}

export interface SubContractorWorkOrderDetails {
    subContractorWorkOrderDetailsId:number;
                subContractorWorkOrderId:number;
                indentId: number;
                workId: number;
                quantityOrdered: number;
                workRate: number;
}

export interface IndentDetails {
    indentDetailsId: number;
    indentId : number;
    materialId : number;
    workId : number;
    quantityRequired : number;
    requiredDate : Date;
    quantityOrdered : number;
    purchaseFlag : number;
} 
