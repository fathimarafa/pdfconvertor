export interface BankAccount {
    id: number;
    bankId: number;
    companyId: number;
    branchId: number;
    bankName: string;
    branchName: string;
    ifsCode: string;
    micr_Code: number;
    currentBalance: number;
    balanceType: string;
    accountTypeId: number;
    accountNo: number;
    city: number;
    financialYearId: number;
    isOD: number;
    minimumBalance: number;
    userId: number;
}