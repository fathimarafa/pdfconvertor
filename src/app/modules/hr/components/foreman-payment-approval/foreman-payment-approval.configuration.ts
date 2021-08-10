export const ForemanPaymentApprovalMetadata = {
    "moduleId": "foremanpayment",
    "moduleName": "foremanpayment",
    "displayName": "HR/ Foreman Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanPayment",
    "tableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'fullName',
            "displayName": 'Name'
        },
        {
            "field": 'paymentDate',
            "displayName": 'Payment Date'
        },
        {
            "field": 'paymentMode',
            "displayName": 'Payment Mode'
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
            "field": 'foremanPaymentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'billNumber',
            "displayName": 'Bill Number'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'paymentAmount',
            "displayName": 'Payment Amount'
        }
        
    ]
}