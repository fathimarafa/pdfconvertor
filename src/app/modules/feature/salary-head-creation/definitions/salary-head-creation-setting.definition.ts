export interface SalaryHeadCreationSetting {
    salaryHeadTypeId: number;
    salaryItemHeadName: string;
    calculateOn: string;
    active: boolean;
    remarks: string;
    calculationMode: string;
    vary: number;
    upperlimit: number;
    deductLeav: number;
    companyId: number;
    branchId: number;
}