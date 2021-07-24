export const BasicSitemanagerTransactionApprovalMetadata = {
    "moduleId": "sitemanagertransaction",
    "moduleName": "Sitemanager Transaction",
    "displayName": "Payment And Receipt / Sitemanager Transaction Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/Sitemanager",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'transactionType',
            "displayName": 'Transaction Type'
        },
        {
            "field": 'transactionDate',
            "displayName": 'Date'
        },
        {
            "field": 'employeeId',
            "displayName": 'Site Manager'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
        {
            "field": 'narration',
            "displayName": 'Description'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}