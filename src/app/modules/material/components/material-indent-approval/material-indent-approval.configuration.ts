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
            "field": 'projectName',
            "displayName": 'Project'
        },
        {
            "field": 'supplierName',
            "displayName": 'Supplier Preferred'
        },
        {
            "field": 'indentedDate',
            "displayName": 'Indented Date'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'action',
            "displayName": ''
        }
    ],
    "itemDetailstableColumns": [
        {
            "field": 'id',
            "displayName": 'S.No'
        },
        {
            "field": 'MaterialName',
            "displayName": 'Item'
        },
        {
            "field": 'QuantityRequired',
            "displayName": 'Required Quantity'
        },
        {
            "field": 'RequiredDate',
            "displayName": 'Urgency'
        }
    ]
}