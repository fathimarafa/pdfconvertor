export const MaterialPurchaseOrderApprovalMetadata = {
    "moduleId": "materialpurchaseorderapproval",
    "moduleName": "Material Purchase Order Approval",
    "displayName": "Material / Purchase Order Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/PurchaseOrder",
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
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'supplierName',
            "displayName": 'Supplier'
        },
        {
            "field": 'contactperson',
            "displayName": 'Contact Person'
        },
        {
            "field": 'contactNo',
            "displayName": 'Contact No:'
        },
        {
            "field": 'action',
            "displayName": ''
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