export interface Department {
    departmentId: Number;
    departmentShortName: String;
    departmentLongName: String;
    departmentCategory: DepartmentCategoryTypes;
    companyId: Number;
    branchId: Number;
    userId: Number;
}

export enum DepartmentCategoryTypes {
    private = 'PRIVATE',
    government = 'GOVERNMENT'
}