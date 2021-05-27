export const FormLevelSettingMetadata = {
    "moduleId": "formlevelsetting",
    "moduleName": "Form Level Setting",
    "displayName": "CRM / Form Level Setting",
    "hasAddNew": true,
    "hasEdit": true,
    "hasDelete": true,
    "useMultiStepForm": false,
    "serviceEndPoint": {
        "level":"BuildExeCRM/api/Level",
        "getMenuWithApproval":'BuildExeCRM/api/ApprovalMenu'
    },
    "tableColumns": [
        {
            "field": 'id',
            "displayName": 'SNo'
        },
        {
            "field": 'menuName',
            "displayName": 'Menu Name'
        },
        {
            "field": 'formlevel',
            "displayName": 'Form Level'
        }
    ]
}