export const MaterialSupplierPaymentApprovalMetadata = {
    "moduleId": "materialsupplierpaymentapproval",
    "moduleName": "Supplier Payment Approval",
    "displayName": "Payment and Receipt / Supplier Payment Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/SupplierPayment",
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
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'paymentdetails',
            "displayName": 'Payment Details'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}