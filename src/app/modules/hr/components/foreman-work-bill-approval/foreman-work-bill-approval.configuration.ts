export const ForemanWorkBillApprovalMetadata = {
    "moduleId": "foremanworkbill",
    "moduleName": "foremanworkbill",
    "displayName": "HR/ Foreman Work Bill",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ForemanWorkBill",
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
            "field": 'billDate',
            "displayName": 'Bill Date'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'amountPaidAdvance',
            "displayName": 'Amount PaidAdvance'
        },
        {
            "field": 'balanceAmount',
            "displayName": 'Balance Amount'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'foremanWorkBillDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'labourWorkName',
            "displayName": 'Labour Work Name'
        },
        {
            "field": 'noOfLabours',
            "displayName": 'no.Of Labours'
        },
        {
            "field": 'wage',
            "displayName": 'Wage'
        },
        {
            "field": 'oTRate',
            "displayName": 'OT Rate'
        },
        {
            "field": 'oTHours',
            "displayName": 'OT Hours'
        }
        
    ]
}