export interface ProjectConsultancy {
    id: number;
    projectId: number;
    workid: number;
    unitRate: number;
    qty: number;
    description: string;
    remarks: string;
    startdate: Date;
    enddate: Date;
    userId: number;
}