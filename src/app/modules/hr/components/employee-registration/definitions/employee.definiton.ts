export interface IEmployee {
    id: number;
    employeeCategoryId: number;
    employeeDesignationId: number;
    employeeLabourGroupId: number;
    employeeSalaryTypeId: number;
    fullName: number;
    address: number;
    sex: string;
    dateOfBirth: Date;
    dateOfJoining: Date;
    phoneNo: number;
    mobileNo: number;
    salaryAmount: number;
    pfNo: string;
    esiNo: string;
    companyId: number;
    branchId: number;
    labourHead: string;
    status: string;
    emailId: string;
    employeeCode: string;
    overtime: number;
}

export interface IEmployeeCategory {
    employeeCategoryId: number,
    employeeCategoryName: string
}

export interface IEmployeeDesignation {
    id: number,
    employeeDesignationName: string,
    description: string,
    departmentId: number,
    employeeCategoryId: number,
    companyId: number,
    branchId: number,
    marketing: number,
    userId: number
}

export interface IDropdown {
    label: string,
    value: number
}