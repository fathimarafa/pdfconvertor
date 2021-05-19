export interface Project {
    id?: number;
    projectId?: string;
    projectTypeId?: string;
    departmentId?: number;
    projectName?: string;
    projectDescription?: string;
    status?: number;
    statusDescription?: string;
    startDate?: Date;
    endDate?: Date;
    clientId?: number;
    firstName?: string;
    lastName?: string;
    sex?: string;
    gsT_No?: string;
    dateOfBirth?: Date;
    address?: string;
    post?: string;
    pin?: string;
    phoneNumber?: string;
    mobileNumber?: string;
    emailId?: string;
    totalArea?: number;
    ratePerArea?: number;
    totalAmount?: number;
    paymentModeId?: number;
    companyId?: number;
    branchId?: number;
    userId?: number;
    enquiryId?: number;
}

export interface ProjectStage {
    id?: number;
    projectId?: string;
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

export interface ProjectRegistration extends Project, ProjectStage {

}