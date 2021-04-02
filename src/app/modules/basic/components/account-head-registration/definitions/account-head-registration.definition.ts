export interface AccountHead {
    accountHeadId: number;
    accountHeadName: string;
    accountTypeId: number;
    accountGroupId: number;
    accountSubGroupId: number;
    accountSubGroupName: string;
    companyId: number;
    branchId: number;
    openingAmount: number;
    openingType: string;
    description: string;
    editable: string;
    financialyearId: number;
    userId: number;
}

export interface AccountType {
    account_type_id: number;
    account_type_name: string;
}

export interface AccountGroup {
    account_group_id: number;
    account_type_id: number;
    account_group_name: string;
}

export interface AccountSubGroup {
    accountSubGroupId: number;
    accountTypeId: number;
    accountGroupId: number;
    accountSubGroupName: string;
    description: string;
}