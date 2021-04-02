export interface BasicChequeClearence {
    id: number;
    chequeDate: Date;
    companyId: number;
    branchId: number;
    financialYearId: number;
    formName: string;
    isDeleted: number;
    clearenceStatus: number;
    bankId: number;
    bankName: string;
    chequeNo: number;
    party: string;
    amount: number;
    chequeType: string;
    userId: number;
}