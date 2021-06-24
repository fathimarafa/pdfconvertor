export const ManualBOQApprovalMetadata = {
    "moduleId": "manualboqapproval",
    "moduleName": "Manual BOQ Approval",
    "displayName": "Prebudget / Manual BOQ Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/BOQ",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectName',
            "displayName": 'Project Name'
        },
        {
            "field": 'unitName',
            "displayName": 'Unit Name'
        },
        {
            "field": 'workCategoryName',
            "displayName": 'Category'
        },
        {
            "field": 'workTypeName',
            "displayName": 'Work Type'
        },
        {
            "field": 'netAmount',
            "displayName": 'Amount'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "specificationDetailsTable": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'itemName',
            "displayName": 'Material'
        },
        {
            "field": 'qtyRequired',
            "displayName": 'Qty'
        },
        {
            "field": 'rateOfItem',
            "displayName": 'Rate'
        },
        {
            "field": 'amount',
            "displayName": 'Amount'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ]
}