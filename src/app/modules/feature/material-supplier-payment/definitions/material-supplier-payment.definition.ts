export interface MaterialSupplierPayment{
  id:number;
  supplierId:number;
  voucherNumber:number;
  voucherTypeId:number;
  finantialYearId:number;
  companyId:number;
  branchId:number;
  paymentDate:Date
  paymentMode:string;
  paymentModeId:number;
  paymentNo:number;
  withClear:number;
  billWise:number;
  onlinePayment:number;
  paymentdetails:string;
  isDeleted:number;
  chequeClearenceID:number;
  supplierReturn:number;
  approvalStatus:number;
  approvalLevel:number;
  approvedBy:number;
  supplierPaymentDetails:SupplierPaymentDetails[]
}

export interface SupplierPaymentDetails{
    supplierPaymentDetailsId:number;
    supplierPaymentId:number;
    purchaseId:number;
    paymentAmount:number;
    advanceAmount:number;
    discountAmount:number;
    isOpening:number;
    projectId:number;
    unitId:number;
    blockId:number;
    floorId:number;
}