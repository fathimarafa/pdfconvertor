export interface Template {
    id?: number;
    templateName?: string;
    templateNo?: string;
    categoryId?: number;
    workTypeId?: number;
    companyId?: number;
    branchId?: number;
    isDeleted?: number;
    userId?: number;
    templateDetail?: TemplateDetail[]
}

export interface TemplateDetail {
    templateDetailId?: number;
    templateId?: number;
    itemTypeId?: number;
    itemId?: number;
    itemQty?: number;
    itemRate?: number;
}

export enum TemplateDetailsId {
    material = 'material',
    labour = 'labour',
    subcontr = 'subcontr',
}