export interface RateComparison{
   id?:number;
   specId?:number;
   projectId?:number;
   unitId?:number;
   blockId?:number;
   floorId?:number;
   specRatePerUnit?:number;
   approvedBy?:number;
   approvalStatus?:number;
   approvalLevel?:number;
   approvalRemarks?:string;
   isReject?:number;
}