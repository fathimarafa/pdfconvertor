export const MaterialQuotationApprovalMetadata = {
    "moduleId": "MaterialQuotationApprovalMetadata",
    "moduleName": "Material Quotation Approval",
    "displayName": "Material / Material Quotation Approval",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeMaterial/api/ItemQuotation",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": ''
        },
        {
            "field": 'quotationNumber',
            "displayName": 'Quotation No:'
        },
        {
            "field": 'quotationType',
            "displayName": 'Quotation Type'
        },
        {
            "field": 'validFrom',
            "displayName": 'Valid From'
        },
        {
            "field": 'validTo',
            "displayName": 'Valid To'
        },
        {
            "field": 'projectId',
            "displayName": 'Project Id'
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
            "field": 'supplierId',
            "displayName": 'Supplier'
        },
        {
            "field": 'baseRate',
            "displayName": 'Base Rate'
        },
        {
            "field": 'remarks',
            "displayName": 'Remarks'
        },
        {
            "field": 'minimumOrderQuantity',
            "displayName": 'Minimum Order Quantity'
        },
        {
            "field": 'preference',
            "displayName": 'Preference'
        }
    ]
}