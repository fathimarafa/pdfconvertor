export interface ProjectBooking {
    id?: number;
    projectId?: number;
    enquiryId?: number;
    clientId?: number;
    firstName?: string;
    lastName?: string;
    sex?: string;
    dateOfBirth?: Date;
    address?: string;
    post?: string;
    pin?: string;
    phoneNumber?: number;
    mobileNumber?: number;
    emailId?: string;
    gsT_No?: string;
    paymentModeId?: number;
    coApplicantName?: string;
    coApplicantAddress?: string;
    relationship?: string;
    coApplicantSex?: string;
    coapplicantDateOfBirth?: Date;
    companyId?: number;
    branchId?: number;
    userId?: number;
}

export interface ProjectStage {
    id?: number;
    projectId?: number;
    ownProjectDetailsiId?: number;
    stageName?: string;
    stageStatusId?: number;
    stageRemarks?: string;
    dateToStart?: Date;
    dateToComplete?: Date;
    dateCompleted?: Date;
    dateDue?: Date;
    paymentPercentage?: number;
    stageType?: string;
    sacCode?: string;
    taxInclusive?: string;
    taxArea?: string;
    paymentModeId?: number;
    sgstPercent?: number;
    sgstAmt?: number;
    cgstPercent?: number;
    cGSTAmt?: number;
    igstPercent?: number;
    igstAmt?: number;
    labourWelfarePercent?: number;
    labourWelfareAmount?: number;
    tdsPercent?: number;
    tdsAmount?: number;
    kfcper?: number;
    kfcAmt?: number;
    discount?: number;
    netAmount?: number;
    amountBalance?: number;
    voucherTypeId?: number;
    voucherNumber?: number;
    userId?: number;
}