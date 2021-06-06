export const MaterialReceivedApprovalMetadata = {
    "moduleId": "materialreceivedapproval",
    "moduleName": "Material Received Approval",
    "displayName": "Material / Material Received Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialRecieve",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'companyId',
            "displayName": 'Company'
        },
        {
            "field": 'projectIdTo',
            "displayName": 'To Project'
        },
        {
            "field": 'transferId',
            "displayName": 'Transfer Id'
        },
        {
            "field": 'receiveDate',
            "displayName": 'Received Date'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'recieptDetailId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialName',
            "displayName": 'Material'
        },
        {
            "field": 'quantity',
            "displayName": 'Quantity'
        },
        {
            "field": 'rate',
            "displayName": 'Rate'
        },
        {
            "field": 'tax',
            "displayName": 'Tax'
        },
        {
            "field": 'total',
            "displayName": 'Total'
        }
    ]
}