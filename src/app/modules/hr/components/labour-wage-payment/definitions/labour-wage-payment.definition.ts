export interface LabourWagePayment{
    id: number;
    employeeId: number;
    billVoucherNumber: number;
    billVoucherTypeId: number;
    paymentDate: Date;
    voucherNumber: number;
    voucherTypeId: number;
    financialYearId: number;
    companyId: number;
    branchId: number;
    paymentMode: String;
    paymentModeId: number;
    paymentNo: number;
    withClear: number;
    remarks: String;
    chequeClearenceID: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedBy: number;
    isDeleted: number;
    approvalRemarks: String;
    isReject: number;
    
            

            labourWagePaymentDetails: LabourWagePaymentDetails[]
    }
    export interface LabourWagePaymentDetails{
        labourWagePaymentDetailsId: number;
        labourWagePaymentId: number;
        dateFrom: Date;
        dateTo: Date;
        projectId: number;
        unitId: number;
        blockId: number;
        floorId: number;
        daysWorked: number;
        overTimeHrs: number;
        dailyWageAmount: number;
        overTimeAmount: number;
        totalWage: number;
        othercharges: number;
        previousBalance: number;
        payingAmount: number;
        advanceAmount: number;
        balanceAmount: number;
        netPayable: number;
    }
