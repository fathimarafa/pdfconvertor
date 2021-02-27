export interface ForemanWorkOrder {
    foremanWorkorderId: Number;
    workOrderNo: Number;
    dateOrdered: Date;
    workTypeId: Number;
    description: String;
    projectId: Number;
    unitId: Number;
    blockId: Number;
    floorId: Number;
    companyId: Number;
    branchId: Number;
    foremanId: Number;
    workStatus: Number;
    paymentStatus: Number;
    financailYearId: Number;
    labourWorkRateId: Number;
    work: ForemanWork[]
}

export interface ForemanWork {
    workName: String;
    workRate: Number;
    otRate: Number
}