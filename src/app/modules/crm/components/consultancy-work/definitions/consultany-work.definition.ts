export interface ConsultancyWork {
    id: number,
    workName: string,
    unit: string,
    unitRate: number,
    remarks: string,
    sac_Code: string,
    companyId: number;
    branchId?: number;
    userId?: number;
}