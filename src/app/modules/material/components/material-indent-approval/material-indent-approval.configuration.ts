export const MaterialIndentApprovalMetadata = {
    "moduleId": "MaterialIndentApprovalMetadata",
    "moduleName": "Material Indent Approval",
    "displayName": "Material / Material Indent Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/Indent",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
        },
        {
            "field": 'supplierPreferred',
            "displayName": 'Supplier Preferred'
        },
        {
            "field": 'indentedDate',
            "displayName": 'Indented Date'
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'materialId',
            "displayName": 'Item'
        },
        {
            "field": 'quantityRequired',
            "displayName": 'Required Quantity'
        },
        {
            "field": 'requiredDate',
            "displayName": 'Urgency'
        }
    ]
}