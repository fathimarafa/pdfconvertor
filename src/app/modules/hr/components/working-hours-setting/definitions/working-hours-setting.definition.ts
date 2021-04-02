export interface WorkingHoursSetting {
    workingHoursSettingId: number;
    designation_id: number;
    companyId: number;
    branchId: number;
    time_in: Date;
    time_out: Date;
    financial_year_id: number;
    relaxation: number;
    employeeCategoryId: number;
    workingHours: Date;
}