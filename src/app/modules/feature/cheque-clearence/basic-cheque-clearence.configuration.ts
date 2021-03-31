export const BasicChequeClearenceMetadata = {
    "moduleId": "basicchequeclearence",
    "moduleName": "Basic Cheque Clearence",
    "displayName": "Basic / Cheque Clearence",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/ChequeClearence",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'chequeDate',
            "displayName": 'Cheque Date'
        },
        {
            "field": 'bankName',
            "displayName": 'Bank'
        },
        {
            "field": 'chequeNo',
            "displayName": 'Cheque No:'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'formName',
            "displayName": 'Form Name'
        },
        {
            "field": 'party',
            "displayName": 'Party'
        },
        {
            "field": 'clearenceStatus',
            "displayName": 'Clear Cheque'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "status",
            "templateOptions": {
                "label": "Enquiry Status",
                "required": true
            }
        }
    ]
}