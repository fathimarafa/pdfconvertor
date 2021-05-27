export const MaterialTransferRequestApprovalMetadata = {
    "moduleId": "materialtransferrequestapproval",
    "moduleName": "Material Transfer Request Approval",
    "displayName": "Material / Material Transfer Request Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/MaterialTransfer",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'companyId',
            "displayName": 'From Company'
        },
        {
            "field": 'branchId',
            "displayName": 'From Branch'
        },
        {
            "field": 'toCompany',
            "displayName": 'To Company'
        },
        {
            "field": 'transferDate',
            "displayName": 'Transfer Date'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'transferDetailId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialId',
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