export const DamageStockEntryApprovalMetadata = {
    "moduleId": "damagestockentryapproval",
    "moduleName": "Damage Stock Entry Approval",
    "displayName": "Material / Damage Stock Entry Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/DamageStock",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'projectId',
            "displayName": 'Project'
        },
        {
            "field": 'unitId',
            "displayName": 'Unit'
        },
        {
            "field": 'materialId',
            "displayName": 'Material'
        },
        {
            "field": 'stock',
            "displayName": 'Stock'
        },
        {
            "field": 'rate',
            "displayName": 'Rate'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ]
}