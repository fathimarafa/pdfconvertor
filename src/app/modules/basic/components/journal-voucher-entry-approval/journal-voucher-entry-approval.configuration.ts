export const JournalVoucherEntryApprovalMetadata = {
    "moduleId": "journalvoucherentryapproval",
    "moduleName": "Journal Voucher Entry Approval",
    "displayName": "Payment and Receipt / Voucher Entry Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/journal",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'journalDate',
            "displayName": 'Date'
        },
        // {
        //     "field": 'debitHeadId',
        //     "displayName": 'Debit'
        // },
        // {
        //     "field": 'creditHeadId',
        //     "displayName": 'Credit'
        // },
        // {
        //     "field": 'amount',
        //     "displayName": 'Amount'
        // },
        {
            "field": 'description',
            "displayName": 'Description'
        },
        {
            "field": 'projectId',
            "displayName": 'ProjectId'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}