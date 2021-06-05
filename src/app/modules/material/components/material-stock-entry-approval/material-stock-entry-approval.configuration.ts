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
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'MaterialName',
            "displayName": 'Item'
        },
        {
            "field": 'Quantity',
            "displayName": 'Quantity'
        },
        {
            "field": 'Rate',
            "displayName": 'Rate'
        },
        {
            "field": 'Tax',
            "displayName": 'Tax'
        },
        {
            "field": 'Disount',
            "displayName": 'Disount'
        },
        {
            "field": 'Total',
            "displayName": 'Total'
        }
    ]
}