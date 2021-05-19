export const LoginMetadata = {
    "moduleId": "login",
    "moduleName": "Login",
    "displayName": "CRM / Login",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": "BuildExeCRM/api/Login",
    "formFields": [
        {
            "key": "companyId",
            "type": "select",
            "templateOptions": {
                "label": "Select company",
                "options": [],
                "required": true
            }
        },
        {
            "key": "branchId",
            "type": "select",
            "templateOptions": {
                "label": "Select branch",
                "options": [],
                "required": true
            }
        },
        {
            "type": "input",
            "key": "username",
            "templateOptions": {
                "label": "Username",
                "required": true
            }
        },
        {
            "type": "input",
            "key": "password",
            "templateOptions": {
                "label": "Password",
                "required": true,
                "type":"password"
            }
        }
    ]
}