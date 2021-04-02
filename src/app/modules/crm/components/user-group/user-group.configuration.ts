export const UserGroupMetadata = {
    "moduleId": "usergroup",
    "moduleName": "UserGroup",
    "displayName": "CRM / UserGroup",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/UserGroup",
    "tableColumns": [
        {
            "field": 'userGroupId',
            "displayName": 'SNo'
        },
        {
            "field": 'userGroupName',
            "displayName": 'Group Name'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "type": "input",
            "key": "userGroupName",
            "templateOptions": {
                "label": "Group Name",
                "required": true
            }
        }
    ]
}