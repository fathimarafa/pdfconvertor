export interface Subcontractorlabourgroup {
    id: number;
    workName: string;
    dateOrdered: Date;
    subContractorId: number;
    workTypeId: number;
    projectId : number;
    unitId : number;
    blockId : number;
    floorId : number;
    description : string;
    companyId : number;
    branchId : number;
    workStatus : number;
    userId : number;
    attendanceSettingDetails: AttendanceSettingDetails[]
}

export interface AttendanceSettingDetails {
    attendanceSettingDetailsId : number;
    subContractorAttendanceSettingId : number;
    labourWorkId : number;
    workRate : number;
    otRate : number;
}