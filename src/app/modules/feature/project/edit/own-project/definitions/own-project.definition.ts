export interface OwnProject {
    projectId: String,
    departmentId: Number,
    projectTypeId: String,
    projectName: String,
    projectDescription: String,
    startDate: Date,
    endDate: Date,
    companyId: Number,
    branchId: Number,
    unit: ProjectUnit[]
}

export interface ProjectUnit {
    unitStartDate: Date,
    unitEndDate: Date,
    type: String,
    floorId: Number,
    unitNo: String,
    description: String,
    totalArea: String,
    ratePerArea: Number,
    areaTax: Number
    landCost: Number,
    landTax: Number
    unitCost: Number
}