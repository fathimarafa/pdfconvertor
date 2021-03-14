export interface Project {
    id: number;
    projectId: String,
    departmentId: number,
    projectTypeId: String,
    projectName: String,
    projectDescription: String,
    startDate: Date,
    endDate: Date,
    companyId: number,
    branchId: number,
    unit: ProjectUnit[]
}

export interface ProjectUnit {
    unitStartDate: Date,
    unitEndDate: Date,
    type: String,
    floorId: number,
    unitNo: String,
    description: String,
    totalArea: String,
    ratePerArea: number,
    areaTax: number
    landCost: number,
    landTax: number
    unitCost: number
}