export const DocumentGroupMetadata = {
    "moduleId": "documentgroup",
    "moduleName": "Document Group",
    "displayName": "Basic / Document Group",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeBasic/api/DocumentGroup",
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'documentGroupName',
            "displayName": 'Document Group Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "documentGroupName",
            "templateOptions": {
                "label": "Document Group Name",
                "required": true
            }
        }
    ]
}