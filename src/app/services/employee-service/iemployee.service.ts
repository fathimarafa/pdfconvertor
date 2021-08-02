import { Observable } from "rxjs";

export interface IEmployeeService {
    getLabour(): Observable<EmployeeDesignation[]>;
    getGroupLabour(): Observable<EmployeeDesignation[]>;
    getContractor(): Observable<EmployeeDesignation[]>;
    getSubContractor(): Observable<EmployeeDesignation[]>;
    getForeman(): Observable<EmployeeDesignation[]>;
    getSiteManager(): Observable<EmployeeDesignation[]>;
    getMonthlySalaried(): Observable<EmployeeDesignation[]>;
}

export enum EmployeeCategory {
    LABOUR = 1,
    GROUPLABOUR = 2,
    CONTRACTOR = 3,
    SUBCONTRACTOR = 4,
    FOREMAN = 5,
    SITEMANAGER = 6,
    MONTHLYSALARIED = 7
}

export interface EmployeeDesignation {
    id: number;
    employeeCode: number
    fullName: string
}