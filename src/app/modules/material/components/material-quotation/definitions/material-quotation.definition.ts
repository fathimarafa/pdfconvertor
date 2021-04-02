export interface MaterialQuotation {
    id: number;
    quotationNumber: string;
    quotationType: string;
    validFrom: Date;
    validTo: Date
    projectId: number;
    materialId: number;
    quantity: number;
    companyId: number;
    branchId: number;
    indentId: number;
    isDeleted: number;
    userId: number;
}