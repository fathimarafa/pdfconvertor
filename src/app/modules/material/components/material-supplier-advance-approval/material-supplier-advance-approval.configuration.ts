export const MaterialSupplierAdvanceApprovalMetadata = {
    "moduleId": "materialsupplieradvanceapproval",
    "moduleName": "MaterialSupplierAdvanceApproval",
    "displayName": "Payment and Receipt / Supplier Advance Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/SupplierAdvance",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'supplierName',
            "displayName": 'Supplier'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'advanceAmount',
            "displayName": 'Advance Amount'
        },
        {
            "field": 'advanceRecoveryBalance',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'narration',
            "displayName": 'Description'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ]
}