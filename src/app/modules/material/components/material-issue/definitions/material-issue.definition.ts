export interface MaterialIssue {
    id: number;
    usageDate: Date
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    usageType: string,
    issuedTo: number;
    approvedBy: number;
    approvedDate: Date
    approvalStatus: number;
    approvalLevel: number;
    finantialYearId: number;
    workCategory: number;
    isDeleted: number;
    materialUsageDetails: MaterialUsageDetails[]
}

export interface MaterialUsageDetails {
    materialUsageDetailsId: number;
    materialUsageId: number;
    materialId: number;
    quantity: number;
    rate: number;
}