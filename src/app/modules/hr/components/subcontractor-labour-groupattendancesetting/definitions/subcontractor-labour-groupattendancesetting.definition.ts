export interface SubcontractorlabourgroupaAttendance {
    subcontractorWorkorderId: any;
   
    id : number;
    workOrderMasterId: number;
    billDate : Date;
    billNumber : number;
    subId : number;
    projectId : number;
    unitId : number;
    blockId : number;
    floorId : number;
    companyId : number;
    branchId : number;
    amount : number;
    financialYearId : number;
    approvalStatus : number;
    approvedDate : Date;
    approvedBy : number;
    approvalLevel : number;
    isDeleted : number;
    approvalRemarks : string;
    isReject : number;
    attendanceDetails: AttendanceDetails[]
}

export interface AttendanceDetails {
    
    attendanceDetailsId : number;
    subContractorAttendanceId :number;
    labourWorkId : number;
    labourWorkName : string;
    noOfLabours : number;
    wage : number;
    oTRate : number;
    oTHours : number;

}