export interface BulkAttendanceEntry {
    id: number;
    attendanceType: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    categoryId: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedDate: Date;
    approvedBy: number;
    approvalRemarks: string;
    isReject: number;
    attendanceMonthlyDetails: AttendanceMonthlyDetails[]
}
export interface AttendanceMonthlyDetails
        {
            attendanceMonthlyDetailsId: number;
            attendanceMonthlyId: number;
            employeeId: number;
            monthId: number;
            fromDate: string;
            toDate: string;
            workingdays: number;
            work: number;
            amount: number;
            overTime: number;
            overTimeAmount: number;
}