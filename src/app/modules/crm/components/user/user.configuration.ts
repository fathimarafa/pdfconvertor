export const UserMetadata = {
    "moduleId": "user",
    "moduleName": "User",
    "displayName": "CRM / User",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Users",
    "tableColumns": [
        {
            "field": 'active',
            "displayName": 'Active'
        },
        {
            "field": 'userId',
            "displayName": 'User Id'
        },
        {
            "field": 'userGroupId',
            "displayName": 'User Type'
        },
        {
            "field": 'action',
            "displayName": 'Action'
        }
    ],
    "formFields": [
        {
            "key": "userGroupId",
            "type": "select",
            "templateOptions": {
                "label": "Select user type",
                "options": [
                    {
                        "label": "admin",
                        "value": "1"
                    },
                    {
                        "label": "user",
                        "value": "2"
                    }
                ],
                "required": true
            }
        },
        {
            "type": "input",
            "key": "fullName",
            "templateOptions": {
                "label": "Full Name",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "userId",
            "templateOptions": {
                "label": "User Id",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "password",
            "templateOptions": {
                "label": "Password",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "mobile",
            "templateOptions": {
                "label": "Mobile",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "emailId",
            "templateOptions": {
                "label": "Email Id",
                "required": true
            }
        }
    ]
}