export const AdditionalBillApprovalMetadata = {
    "moduleId": "additionalbillapproval",
    "moduleName": "Additional Bill Approval",
    "displayName": "CRM / Additional Bill Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/AdditionalBill",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'billNumber',
            "displayName": 'Bill Number'
        },
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'dueDate',
            "displayName": 'Due Date'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}