export interface LaboursInProject{
    id: number;
    employeeCategoryId: number;
    employeeLabourGroupId: number;
    projectId: number;
    unitId: number;
    blockId: number;
    floorId: number;
    dateAssigned: Date;
    userId: number;
    companyId: number;
    branchId: number;
    laboursInProjectDetail: LaboursInProjectDetail[]
  
}
export interface LaboursInProjectDetail{
            laboursInProjectDetailId: number;
            laboursInProjectId: number;
            employeeId: number;
}
export interface laboursInProjectDetails{
EmployeeCategoryId: number;
EmployeeLabourGroupId: number;
projectId: number;
unitId: number;
blockId: number;
floorId:  number;
CompanyId: number;
BranchId: number;
}