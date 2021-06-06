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
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'unitName',
            "displayName": 'Unit'
        },
        {
            "field": 'materialName',
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