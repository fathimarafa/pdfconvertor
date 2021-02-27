import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";

export interface GovernmentProjectBooking {
    projectBookingId: String;
    projectId: Number;
    projectStatusId: Number;
    dateEntered: Date;
    narration: String;
    tenderSubmission?: GovernmentTenderSubmission;
    openTender?: GovernmentOpenTender;
    tenderNegotiation?: GovernmentTenderNegotiation;
    workOrder?: GovernmentWorkOrder
}

export interface GovernmentProjectBookingProjectDetails {
    projectBookingId: String;
    projectId: Number;
    projectStatusId: Number;
    changedProjectStatusId;
    dateEntered: Date;
    narration: String;
}

export interface GovernmentTenderSubmission {
    tenderTypeId: String;
    tenderNumber: String;
    emdAmount: String;
    emdType: String;
    prebudgetedTenderAmount: String;
    bank: String;
    tenderAmount: String;
    transactionNo: String;
    tenderFee: String;
    narration: String;
    feeType: String;
    emdStatus: String;
}

export interface GovernmentOpenTender {
    companyName: String;
    contractorName: String;
    tenderStatusId: Number;
    marksGiven: Number;
    narration: String;
    position: String;
    tenderAmount: Number;
}

export interface GovernmentTenderNegotiation {
    tenderAmount: String;
    negotiationPer: String;
    amount: String;
    revisedProjectCost: String;
    narration: String;
}

export interface GovernmentWorkOrder {
    securityDeposit: String;
    securityDepositTypeItem: String;
    performanceGuarantee: String;
    securityDepositNarration: String;
    securityDepositStatus: String;
    workOrderNarration: String;
    chequeNo: String;
}

export enum GovernmentProjectStatus {
    TenderSubmitted,
    TenderOpened,
    Negotitated,
    WorkOrder
}

interface IModalForms<T> {
    form: FormGroup,
    model: T,
    options: FormlyFormOptions,
    fields: FormlyFieldConfig[]
}

export interface IGovernmentBookingForms {
    projectDetails: IModalForms<GovernmentProjectBookingProjectDetails>,
    tenderSubmission: IModalForms<GovernmentTenderSubmission>,
    openTender: IModalForms<GovernmentOpenTender>,
    tenderNegotiation: IModalForms<GovernmentTenderNegotiation>,
    workOrder: IModalForms<GovernmentWorkOrder>
}
