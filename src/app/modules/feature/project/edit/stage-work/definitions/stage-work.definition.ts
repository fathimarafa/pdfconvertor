export interface ProjectStageWork {
    consultancyId: String,
    consultancyName: String,
    paymentModeId: String,
    totalCost: String,
    taxType: String,
    stage: Stage[]
}

export interface Stage {
    stageName: String,
    unitCost: String,
    grossAmount: String,
    taxArea: String,
    sgstPercent: String,
    sgstAmt: String,
    cgstPercent: String,
    cgstAmt: String,
    igstPercent: String,
    igstAmt: String,
    kfcAmt: String,
    kfcper: String,
    tds: String,
    tdsAmount: String,
    dateToStart: Date,
    dateToComplete: Date,
    discount: String
    stageNetAmount: String
    remarks: String
}
