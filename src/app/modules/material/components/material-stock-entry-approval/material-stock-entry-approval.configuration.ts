export const MaterialStockEntryApprovalMetadata = {
    "moduleId": "materialstockentryapproval",
    "moduleName": "Material Stock Entry Approval",
    "displayName": "Material / Stock Entry Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Purchase",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'purchaseOrderNo',
            "displayName": 'Purchase Order No'
        },
        {
            "field": 'purchaseDate',
            "displayName": 'Purchase Date'
        },
        {
            "field": 'supplierName',
            "displayName": 'Supplier'
        },
        {
            "field": 'remark',
            "displayName": 'Remarks'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'materialName',
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
            "field": 'disount',
            "displayName": 'Disount'
        },
        {
            "field": 'total',
            "displayName": 'Total'
        }
    ]
}