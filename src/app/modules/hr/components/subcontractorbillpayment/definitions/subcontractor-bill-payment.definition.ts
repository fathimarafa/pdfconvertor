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
  subContractorPaymentDetails: SubContractorPaymentDetails[]
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

      export interface SubContractorForPayment{
        
          id : number;
          billno : string;
          billDate : Date;
          projectId : number;
          projectName : string;
          unitId : number;
          unitName : string;
          blockId : number;
          blockName : string;
          floorId : number;
          floorName : string;
          billAmount : number;
          payment : number;
          billAmountBalance : number;
         
      
      }