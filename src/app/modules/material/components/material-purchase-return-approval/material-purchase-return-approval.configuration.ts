export const MaterialPurchaseReturnApprovalMetadata = {
    "moduleId": "materialpurchasereturnapproval",
    "moduleName": "Material Purchase Return Approval",
    "displayName": "Material / Material Purchase Return Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/PurchaseReturn",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'returnDate',
            "displayName": 'Return Date'
        },
        {
            "field": 'purchaseReturnTypeId',
            "displayName": 'Return Type'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'supplierId',
            "displayName": 'Supplier'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'purchaseReturnId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialId',
            "displayName": 'Item'
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