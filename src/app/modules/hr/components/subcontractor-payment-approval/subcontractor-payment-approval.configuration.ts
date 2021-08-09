export const SubcontractorPaymentApprovalMetadata = {
    "moduleId": "subcontractorpayment",
    "moduleName": "subcontractorpayment",
    "displayName": "HR/Subcontractor Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorPayment",
    "tableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
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
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'fullName',
            "displayName": 'SubContractor Name'
        },
        {
            "field": 'voucherNumber',
            "displayName": 'Voucher Number'
        },
        {
            "field": 'paymentNo',
            "displayName": 'Payment Number'
        }
    ]
}