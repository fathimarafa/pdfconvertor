export interface ForemanWorkOrder {
    foremanWorkorderId: number;
    workOrderNo: number;
    dateOrdered: Date;
    workTypeId: number;
    description: String;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    foremanId: number;
    workStatus: number;
    paymentStatus: number;
    financailYearId: number;
    labourWorkRateId: number;
    work: ForemanWork[]
}

export interface ForemanWork {
    workName: String;
    workRate: number;
    otRate: number
}