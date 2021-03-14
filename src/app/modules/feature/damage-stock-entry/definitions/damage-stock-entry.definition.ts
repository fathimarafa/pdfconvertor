export interface DamageStockEntry{
    id: number,
    entrydate: Date,
    projectId: number,
    unitId: number,
    blockId: number,
    floorId: number,
    materialId: number,
    stock: number,
    rate: number,
    finantialYearId: number,
    companyId: number,
    branchId: number,
    approvalStatus: number,
    approvedBy: number,
    approvalLevel: number
}