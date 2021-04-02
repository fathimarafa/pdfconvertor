export interface Department {
    departmentId: number;
    departmentShortName: String;
    departmentLongName: String;
    departmentCategory: DepartmentCategoryTypes;
    companyId: number;
    branchId: number;
    userId: number;
}

export enum DepartmentCategoryTypes {
    private = 'PRIVATE',
    government = 'GOVERNMENT'
}