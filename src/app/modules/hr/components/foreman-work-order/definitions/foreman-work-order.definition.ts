export interface ForemanWorkOrder {
    id: number;
    workName: String;
    dateOrdered: Date;
    foremanId: number;
    workTypeId: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    description: String;
    companyId: number;
    branchId: number;
    workStatus: number;
    userId: number;

    foremanWorkOrderDetails: ForemanWorkOrderDetails[]
}
export interface   ForemanWorkOrderDetails{
                foremanWorkOrderDetailsId: number;
                foremanWorkOrderId: number;
                    labourWorkId: number;
                    workRate: number;
                    otRate: number;
                }
               



