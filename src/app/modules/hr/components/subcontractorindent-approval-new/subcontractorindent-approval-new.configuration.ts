export const SubContractorIndentApprovalComponentMetadata = {
    "moduleId": "SubContractorIndentApproval",
    "moduleName": "SubContractorIndentApproval",
    "displayName": "HR / SubContractorIndentApproval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/Indent",
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
            "field": 'indentedDate',
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
            "field": 'workId',
            "displayName": 'Item'
        },
        {
            "field": 'quantityRequired',
            "displayName": 'Required Quantity'
        },
        {
            "field": 'requiredDate',
            "displayName": 'Required Date'
        }
    ]
}