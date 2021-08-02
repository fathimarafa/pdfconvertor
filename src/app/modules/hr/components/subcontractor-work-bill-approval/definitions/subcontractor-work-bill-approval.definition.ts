export interface SubcontractorBillApproval {
        id : number;
        billDate : Date;
        billno : string;
        workOrderId : number;
        projectId : number;
        projectName : string;
        unitId : number;
        unitName : string;
        blockId : number;
        blockName : string;
        floorId : number;
        floorName : string;
        companyId : number;
        branchId : number;
        subContractorId : number;
        fullName : string;
        financialYearId : number;
        billDateFrom : Date;
        billDateTo : Date;
        amountAsPerAttendance : number;
        amountAsPerBill : number;
        amountAsPerBillBalance : number;
        amountPaidAdvance : number;
        amountRecomendable : number;
        amountRetensionPercent: number;
        amountRetensionAmount : number;
        amountTdsPercent : number;
        amountTdsAmount : number;
        tdsStatus : number;
        retentionStatus : number;
        retentionBalanceAmount : number;
        tax : number;
        taxamount : number;
        taxtype : string;
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
        approvalRemarks : string;
        isReject : number;
        maxlevel : number;
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