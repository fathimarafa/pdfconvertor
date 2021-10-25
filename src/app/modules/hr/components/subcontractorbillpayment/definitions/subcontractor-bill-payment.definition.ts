export interface SubcontractorbillPayment{
  id: number;
  employeeId : number;
  paymentDate : Date;
  voucherNumber : number;
  voucherTypeId : number;
  finantialYearId : number;
  companyId : number;
  branchId : number;
  paymentMode : string;
  paymentModeId : number;
  paymentNo : number;
  withClear : number;
  remarks : string;
  chequeClearenceID : number;
  approvalStatus : number;
  approvalLevel : number;
  approvedBy : number;
  isDeleted : number;
  subContractorPaymentDetails: SubContractorPaymentDetails[];
  subcontractorForPayment: subcontractorForPayment[]
}

  export interface SubContractorPaymentDetails
  
      {
          subContractorPaymentDetailsId : number;
          subContractorPaymentId : number;
          billId : number;
          projectId : number;
          unitId : number;
          blockId : number;
          floorId : number;
          paymentAmount : number;
          discountAmount : number;
          advanceAmount : number;
      }

   
    export interface subcontractorForPayment
    
    {
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