export const BasicDocumentTypeMetadata = {
    "moduleId": "documenttype",
    "moduleName": "Document Type",
    "displayName": "Basic / Document Type",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/DocumentType",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'documentTypeName',
            "displayName": 'Document Type Name'
        },
        {
            "field": 'documentGroupId',
            "displayName": 'Document Group Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "select",
            "key": "documentGroupId",
            "templateOptions": {
                "label": "Document Group Name",
                "required": true,
                "options": []
            }
        },
        {
            "type": "input",
            "key": "documentTypeName",
            "templateOptions": {
                "label": "Document Type Name",
                "required": true
            }
        }
    ]
}