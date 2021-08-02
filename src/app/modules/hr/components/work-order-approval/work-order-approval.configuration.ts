export const WorkOrderApprovalMetadata = {
    "moduleId": "SubContractor Work Order Approval",
    "moduleName": "SubContractor Work Order Approval",
    "displayName": "HR /SubContractor Work Order Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeHR/api/SubContractorWorkOrder",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'workOrderNo',
            "displayName": 'Work Order No'
        },
        {
            "field": 'dateOrdered',
            "displayName": 'Date'
        },
        {
            "field": 'approvedBy',
            "displayName": 'Order By'
        },
        {
            "field": 'subContractorId',
            "displayName": 'Subcontractor'
        },
        {
            "field": 'remarks',
            "displayName": 'Description'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        },

    ],
    "itemDetailstableColumns": [
        {
            "field": 'subContractorWorkOrderDetailsId',
            "displayName": 'Indent No'
        },
        {
            "field": 'labourWorkName',
            "displayName": 'Labour Work Name'
        },
        {
            "field": 'quantityOrdered',
            "displayName": 'Qty'
        },
        {
            "field": 'workRate',
            "displayName": 'Rate'
        },
    ]
}