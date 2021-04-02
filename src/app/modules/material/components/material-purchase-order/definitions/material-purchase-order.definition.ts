export interface MaterialPurchaseOrder{
    id:number;
    projectId:number,
    unitId:number,
    blockId:number,
    floorId:number,
    dateOrdered:Date,
    orderNo:number,
    orderTypeId:number,
    orderCategoryId:number,
    purchaseFlag:number,
    supplierPreffered:number,
    contactperson:String,
    contactNo:String,
    isDeleted:number,
    companyId:number,
    branchId:number,
    finantialYearId:number,
    approvalLevel:number,
    approvedStatus:number,
    approvedBy:number,
    purchaseOrderDetail : PurchaseOrderDetail[]
}

export interface PurchaseOrderDetail{
    purchaseOrderDetailId:number;
    purchaseOrderId:number;
    indentId:number,
    itemId:number,
    quantityOrdered:number,
    quantityPurchased:number,
    itemRate:number,
    disount:number,
    tax:number,
    remarks:String
}