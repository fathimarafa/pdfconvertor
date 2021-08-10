export const ContractorPaymentApprovalMetadata = {
    "moduleId": "contractorpayment",
    "moduleName": "contractorpayment",
    "displayName": "HR/ Contractor Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ContractorPayment",
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
            "field": 'contractorPaymentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'dateOrdered',
            "displayName": 'Date Ordered'
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work Order No '
        },
        {
            "field": 'billAmount',
            "displayName": 'Bill Amount'
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