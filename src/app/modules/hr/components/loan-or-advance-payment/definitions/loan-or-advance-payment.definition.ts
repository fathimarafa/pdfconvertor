export interface LoanOrAdvancePayment {
  userId: number;
  id: number;
  type: boolean;
  designationId: number;
  chequeDDno: string;
  employeeId: number;
  chequeDate: string;
  paymentDate: string;
  description: string;
  withClear: string;
  // bankId: number;
  advanceAmount: number;

  monthly_hpls: number;
  date: string;
  paymentType: string;
  categoryId: number;
  projectId: number;
  unitId: number;
  blockId: number;
  floorId: number;
  companyId: number;
  branchId: number;
  financialYearId: number;
  remarks: string;
  paymentMode: string;
  paymentModeId: number;
  paymentModeNo: string;
  withclear: number;
  approvalStatus: number;
  approvalLevel: number;
  approvedBy: number;
  approvedDate: string;
  voucherTypeId: number;
  voucherNumber: number;
  isDeleted: number;
  approvalRemarks: string;
}
