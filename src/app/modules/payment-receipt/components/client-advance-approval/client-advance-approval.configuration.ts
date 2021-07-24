export const ClientAdvanceApprovalMetadata = {
    "moduleId": "client-advance-approval",
    "moduleName": "Client Advance Approval",
    "displayName": "Pyament and Receipt / Client Advance Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/ClientAdvance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'advanceAmount',
            "displayName": 'Advance Amount'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
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