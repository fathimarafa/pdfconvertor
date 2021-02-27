export const ProjectFloorRegistrationMetadata = {
    "moduleId": "projectfloorregistration",
    "moduleName": "Project Floor Registration",
    "displayName": "Master / Project Floor Registration",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Floor",
    "tableColumns": [
        {
            "field": 'floorId',
            "displayName": 'S.No'
        },
        {
            "field": 'floorName',
            "displayName": 'Floor Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "floorName",
            "templateOptions": {
                "label": "Floor Name",
                "required": true
            }
        }
    ]
}