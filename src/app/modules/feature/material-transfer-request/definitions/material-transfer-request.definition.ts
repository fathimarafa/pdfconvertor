import { FormlyFieldConfig } from "@ngx-formly/core";

export interface MaterialTransferRequest {
    id: number;
    transferDate: Date;
    projectIdFrom: number;
    unitIdFrom: number;
    blockIdFrom: number;
    floorIdFrom: number;
    projectIdTo: number;
    unitIdTo: number;
    blockIdTo: number;
    floorIdTo: number;
    companyId: number;
    branchId: number;
    financialYearId: number;
    multicompany: number;
    toCompany: number;
    approvalStatus: number;
    approvalLevel: number;
    approvedDate: Date;
    approvedBy: number;
    transferStatusId: number;
    transportationCharge: number;
    transportationPer: number;
    loadingUnloadingCharge: number;
    loadingUnloadingPer: number;
    otherCharges: number;
    otherChargesPer: number;
    miscellaneousExpense: number;
    miscellaneousExpensePer: number;
    voucherTypeId: number;
    voucherNumber: number;
    isDeleted: number;
    transferDetail: TransferDetail[]
}

export interface TransferDetail {
    transferDetailId: number;
    materialTransferId: number;
    materialId: number;
    quantity: number;
    rate: number;
    tax: number;
}

export interface ProjectDivisionFields<T> {
    projectDropdown: FormlyFieldConfig;
    blockDropdown: FormlyFieldConfig;
    floorDropdown: FormlyFieldConfig;
    unitDropdown: FormlyFieldConfig;
    model: T;
    isEdit: boolean;
}
