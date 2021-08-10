export const LabourWagePaymentApprovalMetadata = {
    "moduleId": "labourwagepayment",
    "moduleName": "labourwagepayment",
    "displayName": "HR/ Labour Wage Payment",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/LabourWagePayment",
    "tableColumns": [
        {
            "field": 'id',
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
       
        // {
        //     "field": 'remarks',
        //     "displayName": 'Remarks'
        // },
        
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'LabourWagePaymentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'dateFrom',
            "displayName": 'Date From'
        },
        {
            "field": 'dateTo',
            "displayName": 'Date To'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'daysWorked',
            "displayName": 'Days Worked'
        },
        {
            "field": 'dailyWageAmount',
            "displayName": 'Daily Wage Amount'
        },
        {
            "field": 'payingAmount',
            "displayName": 'Paying Amount'
        }
    ]
}