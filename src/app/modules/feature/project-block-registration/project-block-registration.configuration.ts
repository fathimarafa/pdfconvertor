export const ProjectBlockRegistrationMetadata = {
    "moduleId": "projectblockregistration",
    "moduleName": "Project Block Registration",
    "displayName": "Master / Project Block Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Block",
    "tableColumns": [
        {
            "field": 'blockId',
            "displayName": 'S.No'
        },
        {
            "field": 'blockName',
            "displayName": 'Block Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "blockName",
            "templateOptions": {
                "label": "Block Name",
                "required": true
            }
        }
    ]
}