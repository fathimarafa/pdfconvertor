import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export interface MaterialIndent {
    id?: number;
    indentTypeId?: number;
    indentCategoryId?: number;
    projectId?: number;
    unitId?: number;
    blockId?: number;
    floorId?: number;
    indentedDate?: Date;
    approvalStatus?: number;
    remarks?: string;
    supplierPreferred?: number;
    subContractorId?: number;
    approvedDate?: Date;
    approvedBy?: number;
    companyId?: number;
    branchId?: number;
    isDeleted?: number;
    approvalLevel?: number;
    indentDetails?: IndentDetails[]
}

export interface IndentDetails {
    indentDetailsId?: number;
    indentId?: number;
    materialId?: number;
    workId?: number;
    quantityRequired?: number;
    requiredDate?: Date;
    quantityOrdered?: number;
    purchaseFlag?: number;
}

export interface FormMetadata {
    form?: FormGroup;
    model?: MaterialIndent;
    options?: FormlyFormOptions;
    fields?: FormlyFieldConfig[];
}

export interface IndentForm {
    indent?: FormMetadata,
    itemDetails?: FormMetadata
}