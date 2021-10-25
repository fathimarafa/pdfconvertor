export interface SubcontractorBill {
    id: number;
        billDate: Date;
        billno: string;
        workOrderId: number;
        projectId: number;
        unitId: number;
        blockId: number;
        floorId: number;
        companyId: number;
        branchId: number;
        subContractorId: number;
        financialYearId: number;
        billDateFrom : Date;
        billDateTo : Date;
        amountAsPerAttendance: number;
        amountAsPerBill : number;
        amountAsPerBillBalance : number;
        amountPaidAdvance: number;
        amountRecomendable : number;
        amountRetensionPercent : number;
        amountRetensionAmount : number;
        amountTdsPercent : number;
        totalqty:number;
        netAmount:number;
        totalAmount: number;
        amountTdsAmount : number;
        tdsStatus : number;
        retentionStatus : number;
        retentionBalanceAmount : number;
        tax : number;
        taxamount: number;
        taxtype: string;
        othercharge : number;
        roundoff : number;
        remarks : string;
        category : number;
        voucherTypeId : number;
        voucherNumber : number;
        approvalLevel : number;
        approvalStatus : number;
        approvedBy : number;
        dateApproved : Date;
        isDeleted : number;
        subcontractorBillDetails: SubcontractorBillDetails[]
}

export interface SubcontractorBillDetails {
    subContractorBillDetailsId : number;
    subContractorBillId : number;
    workOrderDetailsId : number;
    currentQuantity : number;
     negotiatedAmount : number;
}

export interface SubContractorPreviousSubBill 
{
    id : number,
    workId : number,
    previousBillQty : number
}