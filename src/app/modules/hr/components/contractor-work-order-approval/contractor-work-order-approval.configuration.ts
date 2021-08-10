export const ContractorWorkOrderApprovalMetadata = {
    "moduleId": "contractorworkorder",
    "moduleName": "contractorworkorder",
    "displayName": "HR/ Contractor Work Order",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/ContractorWorkOrder",
    "tableColumns": [
        {
            "field": 'indentDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work Order No'
        },
        {
            "field": 'fullName',
            "displayName": 'Name'
        },
        {
            "field": 'taxType',
            "displayName": 'Tax Type'
        },
        
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'contractorWorkOrderDetailsId',
            "displayName": 'Id'
        },
        {
            "field": 'hsnCode',
            "displayName": 'HSN Code'
        },
        {
            "field": 'workName',
            "displayName": 'Work Name '
        },
        {
            "field": 'qty',
            "displayName": 'Quantity'
        },
        {
            "field": 'rate',
            "displayName": 'Rate'
        },
        {
            "field": 'tax',
            "displayName": 'Tax'
        }
        
    ]
}