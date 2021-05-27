export const MaterialIssueApprovalMetadata = {
    "moduleId": "materialissueapproval",
    "moduleName": "Material Isuse Approval",
    "displayName": "Material / Issue Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/materialusage",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'usageDate',
            "displayName": 'Usage Date'
        },
        {
            "field": 'usageType',
            "displayName": 'Usage Type'
        },
        {
            "field": 'workCategory',
            "displayName": 'Work Category'
        },
    ],
    "itemDetailstableColumns": [
        {
            "field": 'materialUsageDetailsId',
            "displayName": 'SNo'
        },
        {
            "field": 'materialId',
            "displayName": 'Material'
        },
        {
            "field": 'quantity',
            "displayName": 'Quantity'
        },
        {
            "field": 'rate',
            "displayName": 'Rate'
        },
        {
            "field": 'total',
            "displayName": 'Total'
        }
    ]
}