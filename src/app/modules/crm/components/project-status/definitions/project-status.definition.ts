export interface ProjectStatus {
    status: number;
    statusDescription: string;
    userId: number;
}

export interface TenderSubmit {
    id: number;
    dateEntered: Date;
    projectId: number;
    tenderAmount: number;
    tenderFee: number;
    feeType: string;
    feeId: number;
    emdAmount: number;
    emdType: string;
    emdTypeId: number;
    transactionNO: string;
    narration: string;
    emdStatus: string;
}

export interface TendorAnalysis {
    id: number;
    tendorSubmittedId: number;
    projectId: number;
    companyName: string;
    contractorName: string;
    marksGiven: number;
    narration: string;
    position: number;
    tenderAmount: number;
}

export interface TendorAnalysis {
    id: number;
    tendorSubmittedId: number;
    projectId: number;
    companyName: string;
    contractorName: string;
    marksGiven: number;
    narration: string;
    position: number;
    tenderAmount: number;
}

export interface TendorNegotiation {
    id: number;
    projectId: number;
    tenderNegotiationDate: Date;
    tenderNegotiationAmount: number;
    tenderNegotiationPercent: number;
    tenderNegotiationNarration: string;
    tenderRevisedAmount: number;
}

export interface TendorWorkOrder {
    id: number;
    projectId: number;
    securityDepositAmount: number;
    securityDepositType: string;
    securityDepositTypeId: number;
    performanceGuarantee: number;
    securityDepositNarration: string;
    securityDepositStatus: string;
    workOrderNarration: string;
}

export const ProjectStatusTypes = [
    { label: 'Pending', value: 1 },
    { label: 'Tender Submitted', value: 2 },
    { label: 'Tender Opened', value: 3 },
    { label: 'Negotiated', value: 4 },
    { label: 'Work Order', value: 5 },
    { label: 'Active', value: 6 },
    { label: 'Silent', value: 7 },
    { label: 'Rejected', value: 8 },
    { label: 'Completed', value: 9 },
    { label: 'Enquiry', value: 10 }
]