export interface BasicDocumentUpload {
    id: number;
    companyId: number;
    branchId: number;
    documentName: string;
    description: string;
    documentStatus: string;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    enteredDate: Date;
    fileNo: string;
    rackNo: number;
    documentGroupId: number;
    documentTypeId: number;
    category: string;
    documentPath: string;
    userId: number;
}