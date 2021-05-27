export const MaterialPurchaseOrderApprovalMetadata = {
    "moduleId": "materialpurchaseorderapproval",
    "moduleName": "Material Purchase Order Approval",
    "displayName": "Material / Purchase Order Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/PurchcaseOrder",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'orderNo',
            "displayName": 'Order No:'
        },
        {
            "field": 'dateOrdered',
            "displayName": 'Order Date'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'supplierPreffered',
            "displayName": 'Supplier'
        },
        {
            "field": 'contactperson',
            "displayName": 'Contact Person'
        },
        {
            "field": 'contactNo',
            "displayName": 'Contact No:'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'purchaseOrderDetailId',
            "displayName": 'SNo'
        },
        {
            "field": 'itemId',
            "displayName": 'Item'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'quantityOrdered',
            "displayName": 'Quantity'
        },
        {
            "field": 'itemRate',
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