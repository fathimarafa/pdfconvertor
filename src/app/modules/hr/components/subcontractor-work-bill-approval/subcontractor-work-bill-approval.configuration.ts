export const SubcontractorBillApprovalMetadata = {
    "moduleId": "subcontractorworkbill",
    "moduleName": "subcontractorworkbill",
    "displayName": "HR/ SubcontractorBill",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorBill",
    "tableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'subContractorId',
            "displayName": 'Subcontractor Name'
        },
        {
            "field": 'requiredDate',
            "displayName": 'Required Date'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'labourWorkName',
            "displayName": 'Work Name'
        },
        {
            "field": 'negotiatedAmount',
            "displayName": 'Negotiated Amount'
        },
        {
            "field": 'workRate',
            "displayName": 'Work Rate'
        }
    ]
}