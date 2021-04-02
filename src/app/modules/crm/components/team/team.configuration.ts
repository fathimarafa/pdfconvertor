export const TeamMetadata = {
    "moduleId": "team",
    "moduleName": "Team",
    "displayName": "CRM / Team",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Team",
    "tableColumns": [
        {
            "field": 'UnitRegistrationId',
            "displayName": 'SNo'
        },
        {
            "field": 'teamName',
            "displayName": 'Team Name'
        },
        {
            "field": 'teamDetails',
            "displayName": 'Team Members'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "teamName",
            "templateOptions": {
                "label": "Team Name",
                "required": true
            }
        },
        {
            "key": "teamMembers",
            "type": "select",
            "templateOptions": {
                "label": "Select users",
                "multiple": true,
                "options": [],
                "required": true
            }
        }
    ]
}