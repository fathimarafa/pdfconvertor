export const BillReceiptsApprovalMetadata = {
    "moduleId": "bill-receipts-approval",
    "moduleName": "Bill Receipts Approval",
    "displayName": "Payment and Receipts / Bill Receipts Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": true,
    "serviceEndPoint": "BuildExeCRM/api/Reciept",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project ID'
        },
        {
            "field": 'recieptDate',
            "displayName": 'Reciept Date'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}